package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"sort"
	"strconv"
	"time"
)

var (
	path    = flag.String("path", "", "leaderboard path")
	dayFlag = flag.Int("day", 0, "day num")
)

type LeaderboardJSON struct {
	Event   string
	Members map[int]MemberJSON
}

type MemberJSON struct {
	Name               string
	Stars              int
	CompletionDayLevel map[string]map[string]StarJSON `json:"completion_day_level"`
}

type StarJSON struct {
	GetStarTs string `json:"get_star_ts"`
}

type Member struct {
	Name        string
	Stars       int
	Completions map[int]map[int]time.Time
}

type Result struct {
	Name string
	Ts   time.Time
}

type ByTimestamp []Result

func (a ByTimestamp) Len() int           { return len(a) }
func (a ByTimestamp) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByTimestamp) Less(i, j int) bool { return a[i].Ts.Before(a[j].Ts) }

func AtoiOrDie(s string) int {
	val, err := strconv.Atoi(s)
	if err != nil {
		panic(fmt.Sprintf("failed to parse %v: %v", s, err))
	}
	return val
}

func main() {
	flag.Parse()

	if *path == "" {
		log.Fatalf("--path is required")
	}
	if *dayFlag == 0 {
		log.Fatalf("--day is required")
	}

	contents, err := ioutil.ReadFile(*path)
	if err != nil {
		log.Fatal(err)
	}

	var board LeaderboardJSON
	if err := json.Unmarshal([]byte(contents), &board); err != nil {
		log.Fatal(err)
	}

	members := []Member{}
	for _, jsonMember := range board.Members {
		member := Member{
			Name:  jsonMember.Name,
			Stars: jsonMember.Stars,
		}

		completions := map[int]map[int]time.Time{}

		for dayNumStr, day := range jsonMember.CompletionDayLevel {
			dayNum := AtoiOrDie(dayNumStr)
			completions[dayNum] = map[int]time.Time{}
			for starNumStr, jsonStar := range day {
				starNum := AtoiOrDie(starNumStr)
				starTs := time.Unix(int64(AtoiOrDie(jsonStar.GetStarTs)), 0)
				completions[dayNum][starNum] = starTs
			}
		}

		member.Completions = completions

		members = append(members, member)
	}

	results := map[int][]Result{
		1: []Result{},
		2: []Result{},
	}
	for _, member := range members {
		for day, completion := range member.Completions {
			if day != *dayFlag {
				continue
			}

			results[1] = append(results[1], Result{member.Name, completion[1]})
			results[2] = append(results[2], Result{member.Name, completion[2]})
		}
	}

	for starNum := 1; starNum <= 2; starNum++ {
		starResults := results[starNum]
		sort.Sort(ByTimestamp(starResults))

		fmt.Printf("== star %d\n", starNum)
		for _, r := range starResults {
			fmt.Printf("%-20s %v\n", r.Name, r.Ts)
		}
	}

}
