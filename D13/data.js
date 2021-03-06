exports.test = /*['/->-\\        ',
   '|   |  /----\\',
   '| /-+--+-\\  |',
   '| | |  | v  |',
   '\\-+-/  \\-+--/',
   '  \\------/   '];*/
   ['/>-<\\  ',
      '|   |  ',
      '| /<+-\\',
      '| | | v',
      '\\>+</ |',
      '  |   ^',
      '  \\<->/'];

exports.real = ['                /----------------------------------------------------------------------------------------------\\                                      ',
   '   /------------+-----\\                                                                   /--------------------+-----------------\\                    ',
   '   |            |     |                                      /-------------------->-------+<-------------------+------\\         /+-------------\\      ',
   '   |            |     |                                  /---+------\\                     |                    |      |         ||             |      ',
   '   |            |     |                               /--+---+------+---------------------+--------------------+------+---------++---\\  /------+----\\ ',
   '   |            |     |                               |  |   |      |         /-----------+--------------------+------+---------++\\  |  |      |    | ',
   '   |            |     |    /----------------\\         |  |   |      |         |           |               /----+------+---------+++--+--+------+----+\\',
   '   |            |     |    |  /-------------+---------+--+---+------+---------+-----------+-----\\         |    |      |         |||  |  |      |    ||',
   '   |            |     |    |  |             |         |  |   | /----+---------+-----------+-----+---------+----+----->+----\\    |||  |  |      |    ||',
   '   |            |     |    |  |             |         |  |   | |    |    /----+-----------+-----+---------+----+------+----+----+++--+\\ |      |    ||',
   '   |            |     |    |  |             |     /---+--+---+-+----+\\   |    |           |     |         |    |      |    |    |||  || |      |    ||',
   '   |            |     |    |  |             |     |   |  |   | |/---++---+----+-----------+-----+---------+--\\ |      |    |    |||  || |      |    ||',
   '   |            |     |    |  |             |     |   |  |   | ||   ||   |    |           |     |         |  | |      |    |    |||  || |      |    ||',
   '   |            |   /-+----+--+-------------+---\\ |   |  |   | ||   ||/--+----+-----------+-----+---------+--+-+----\\ |    |    |||  || |      |    ||',
   '   | /----------+---+-+----+--+-------------+---+-+---+--+---+-++---+++--+----+-----------+-----+------\\  |  | |    | |    |    |||  || |      |    ||',
   '   | |          |   | |    |  |             |   | |   |  |   | ||   |||  |    |           |     |      |  |  | |    | |    |    |||  || \\------+----/|',
   '   | |          |   | |    |  |             |/--+-+---+--+---+-++---+++--+----+-----------+-----+------+--+--+-+----+-+<---+----+++\\ ||        |     |',
   '   | |         /+---+-+----+--+-------------++-\\| |   |  |   | ||   |||  |    |   /-------+-----+------+--+<-+-+-\\  | |    |    |||| ||        |     |',
   '   | |         ||   | |    |  |             || || |   |  |   | ||   |||  |    |   |       |     |      |  |  | | |  | |/---+----++++-++----\\   |     |',
   '   |/+--------\\||   | |    | /+-----------\\ || || |   |  |   | ||   |||  |    |   |       |   /-+------+--+--+-+-+--+-++---+----++++-++----+---+--\\  |',
   '   |||        |||   | |    | ||           | || || |   |  |   | ||   |||  |    |   |   /---+---+-+------+--+--+-+-+--+-++---+----++++-++----+-\\ |  |  |',
   '   |||        |||   | |    | ||        /--+-++-++-+---+\\ |  /+-++---+++--+----+---+---+---+---+>+------+--+--+-+-+--+-++---+-\\  |||| ||    | | |  |  |',
   '   |||      /-+++---+-+\\   | ||        |  | || || \\---++-+--++-++---+/|  |    |   |   |   |   | |      |  |  | | |  | ||   | |  |||| ||    | | |  |  |',
   '   |||      | |||   | ||   |/++--------+--+-++-++-----++-+--++-++---+-+--+----+---+---+---+---+-+\\     |  |  | | |  | ||   | |  |||| ||    | | |  |  |',
   '   |||      | |||   | ||   ||||        |  | || ||     || |  |\\-++---+-+--+----+---+---+---+---+-++-----+--+--+-+-+--+-/|   | |  |||| ||    | | |  |  |',
   '   |||      | |||   \\-++---++++--------+--+-++-+/     || |  |  ||   | |  |    |   |   |   |   | ||     |  |  | | |  |  | /-+-+--++++-++----+-+-+--+\\ |',
   '   |||      | |||     ||   ||||        |  | || |    /-++-+--+--++---+-+--+----+---+---+---+---+-++-\\   |  |  | | |  |  | | | |  |||| ||    | | |  || |',
   '   |||     /+-+++-----++---++++--------+--+-++-+----+-++-+--+--++---+-+--+----+---+---+---+---+-++-+---+--+\\ | | |  |  | | | |  \\+++-++----+-+-/  || |',
   '   |||     || ||\\-----++---++++--------+--+-++-+----+-++-+--+--++---+-+--+----+---+---+---+---+-++-+---+--++-+-/ |  |  | | | |   ||| ||    | |    || |',
   '   |||     || ||    /-++---++++--------+--+-++-+----+-++-+--+--++---+-+--+----+---+---+---+---+-++-+---+--++-+---+--+--+-+-+-+--\\||| ||    | |    || |',
   '   |||     || ||    | ||   ||||        |  | || |    | || |  |  ||   | |  |    |  /+---+---+---+-++-+---+--++-+---+--+--+-+-+-+--++++-++----+-+----++\\|',
   '   |||     || ||    | ||   ||||        |  | || |    | ||/+--+--++---+-+--+----+\\ ||   |   |   | || |   |  || |   |  |  | | | |  |||| ||    | |    ||||',
   '   |||     || ||    | || /-++++--------+--+-++-+----+-++++--+--++---+-+--+----++-++---+---+---+-++\\|   |  || |   |  |  | | | |  |||| ||    | |    ||||',
   '   |||     |\\-++----+-+/ | ||||    /---+--+-++-+----+-++++--+--++---+-+--+----++-++---+---+---+-++++---+\\ || |   |  |  | | | |  |||| ||    | |    ||||',
   '   |||     |  ||    | |  | ||||    |   |  | || |    | ||||  |  ||   | |  |    || ||   |   |   | ||||   || || |   | /+--+-+-+\\|  |||| ||    | |    ||||',
   '   |||     |  ||    | |  | ||||    |   |  | || |    | ||||  |  ||   | |  |    || ||   |   |   | ||||   || || |   | ||  | | |||  |||| ||    | |    ||||',
   '   |||     |  || /--+-+--+-++++----+---+--+-++-+----+-++++--+--++---+-+--+----++-++---+---+---+-++++---++-++-+---+-++\\ | | |||  |||| ||    | |    ||||',
   '/--+++-----+--++-+--+-+--+-++++----+---+--+-++-+----+-++++--+--++---+-+--+--\\ || ||   |   | /-+-++++---++-++-+---+-+++-+-+-+++--++++-++---\\| |    ||||',
   '|  |||     |  || |  \\-+--+-++++----+---+--+-++-+----+-++++--+--++---+-+--+--+-++-++---+---+-+-+-++++---++-++-+---+-+++-+-+-+++--/||| ||   || |    ||||',
   '|  |||     |  || |  /-+--+-++++----+---+--+-++-+----+-++++--+--++-\\ | |  |  | || ||   |   |/+-+-++++---++-++-+---+\\||| | | |||   ||| ||   || |    ||||',
   '|  |||     |  || |  | |  | ||||    |   |/-+-++-+----+-++++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---++-++-+\\  ||||| | | |||   ||| ||   || |    ||||',
   '| /+++-----+--++-+--+-+--+-++++----+---++-+-++-+----+-++++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---++\\|| ||  ||||| | | |||   ||| ||   || |    ||||',
   '| ||||     |  || |  | |  | ||||    |   || | || |    | \\+++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---+++++-++--+++++-+-+-+++---+++-/|   || |    ||||',
   '| ||||     \\--++-+--+-+--+-++++----+---++-+-++-+----+--+++--+--++-+-+-+--+--+-++-++---+---+++-+-++++---++++/ ||  ||||| | | |||   |||  |   || |    ||||',
   '| ||||        || |  | |  | ||||    |   || | ||/+----+--+++-\\|  || | | |  |  | || ||   |/--+++-+-++++\\  ||||  ||  ||||| | | |||   |||  |   || |    ||||',
   '| ||||        || |  | |  | ||||    |   || | ||||/---+--+++-++--++-+>+-+--+--+-++-++---++-\\||| | |||||  ||||  ||  ||||| | | |||   |||  |   || |    ||||',
   '| ||||        || |  | |  | ||||    |   || | |||||   |  ||| |\\--++-+-+-+--+--+-++-++---++-++++-+-+++++--++++--++--+++++-+-+-++/   |||  |   || |    ||||',
   '| ||||        || |  | |  | ||||    |   || | |||||   |  ||| |   || |/+-+--+--+-++-++---++-++++-+-+++++--++++--++--+++++-+-+-++\\   |||  |   || |    ||||',
   '| ||||       /++-+--+-+--+-++++----+---++-+-+++++---+-\\||| |   || ||| |  |  | || ||   || |||| | |||||  ||||  ||  ||||| | | |||   |||  |   || v    ||||',
   '| ||||  /----+++-+--+-+--+-++++----+---++-+-+++++---+-++++-+---++-+++\\|  |  | \\+-++---++-++++-+-+++++--++++--++--+++++-+-+-+++---+/|  |   || |    ||||',
   '| ||||  |/---+++-+--+-+--+-++++----+---++-+-+++++---+-++++-+---++-+++++--+--+--+\\||   || |||| | |||||  ||||  ||  ||||| | | |||   | |  |   || |    ||||',
   '| ||||  ||   ||| |  | |  | ||||    |   || | |||||/--+-++++-+---++-+++++--+--+--++++---++-++++-+-+++++--++++-\\||  ||\\++-+-+-+/|   | |  |   || |    ||||',
   '| |\\++--++---+++-+--+-/  | ||||    |   \\+-+-++++++--+-+/|| |/--++-+++++--+--+--++++---++-++++-+-+++++--++++-+++--++-++-+-+-+-+---+-+--+-\\ || |    ||||',
   '| | ||  ||   ||| |  |    | ||||    |    | | ||||||  | | || ||  || |||||  |  |  ||||   || ||\\+-+-+++++--++++-+++--+/ || | | | |   | |  | | || |    ||||',
   '| | ||  ||/--+++-+--+----+-++++----+----+-+-++++++--+-+-++-++--++-+++++--+--+-\\||||   || || | | |||||  |||| |||  |  || | | | |   | |  | | || |    ||||',
   '| | ||  |||  ||| |  |    | ||||    |    | | ||||||  | | || ||  || ||||\\--+--+-+++++---++-++-+-+-+++++--++++-+++--+--/| | | | |   | |  | | || |    ||||',
   '| | \\+--+++--+/| |  |    | ||||    |    | | ||||||  | | || ||  || ||||   |  | |||||   || |\\-+-+-+++++--++++-+++--+---+-+-+-+-+---/ |  | | || |    ||||',
   '| |  |  |||  | | |  |    | ||||    |    | | ||||||/-+-+-++-++--++-++++---+--+-+++++---++-+--+-+-+++++--++++-+++--+---+-+\\| | |     |  | | || |    ||||',
   '| |  |  |||  | | |  \\----+-++++----+----+-+-+++++++-+-+-++-++--++-/|||   |  | |||||   ||/+--+-+-+++++--++++-+++\\ |   | ||| | |     |  | | || |    ||||',
   '| |  |  |||  | | |       | ||||    |    | | ||\\++++-+-+-++-/|/-++--+++---+--+-+++++-\\ |||| /+-+-+++++--++++-++++-+---+-+++\\| |     |  | | || |    ||||',
   '| |  | /+++--+-+-+-------+-++++----+----+-+-++-++++-+-+-++--++\\||  |||   |  | ||||| | |||| || | |||||  |||| |||| |   | ||||| |     |  |/+-++-+---\\||||',
   '| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||| | |||| || | |||||  |||| |||| |   | ||||| |     |  ||| || |   |||||',
   '| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||\\-+-++++-++-+-+++++--++++-++++-/   | ||||| |     |  ||| || |   |||||',
   '| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||  | ||||/++-+-+++++--++++-++++-----+-+++++-+--\\/-+--+++-++-+--\\|||||',
   '| |  | ||||  | | |       | ||||    |    | | || |||| | | ||  |||||  |||   |  | ||||  | |\\+++++-+-++++/  |||\\-++++-----+-+++++-+--++-+--+++-++-+--+++++/',
   '| |  | ||||  | | |     /-+-++++----+--\\ | | || |||| | | ||  |||||  |||   |/-+-++++--+-+-+++++-+\\||||   |||  ||||     | ||||| |  || |  ||| || |  ||||| ',
   '| |  | ||||  | | |     | | ||||    |  | | | || |||| | | ||  |||||  |||   || | ||||  | | ||||| ||||||   |||  ||||     | ||||| |  || |  ||| || |  ||||| ',
   '| |  | ||||  | | |     | | \\+++----+--+-+-+-/| |||| | | ||  |||||  |||   || | ||||  | | ||||| ||||||   |||  ||||     | ||||| |  || |  ||| || |  ||||| ',
   '| |  | |||\\--+-+-+-----+-+--+++----+--+-+-+--+-++++-+-+-++--+++++--+++---++-+-/|||  |/+-+++++-++++++---+++\\ ||||     | ||||v |  || |  ||| || |  ||||| ',
   '| |  | |||   | | |     | |  |||    |  | |/+--+-++++-+-+\\||  |||||  |||   || |  |||  ||| |||||/++++++---++++-++++-----+-+++++-+--++-+-\\||| || |  ||||| ',
   '| |  | |||   | | |/----+-+--+++\\   |  | |||  | ||\\+-+-++++--+++++--+++---++-+--+++--+++-++++++++++++---++++-/|||    /+-+++++-+--++-+-++++-++-+-\\||||| ',
   '| |  | |||   | | ||    | |  |\\++---+--+-++/  | || | | ||||  ||||\\--+++---++-+--+++--+++-++++++++++++---++++--/||    || ||||| |  || | |||| || | |||||| ',
   '|/+--+-+++---+-+-++----+-+--+-++---+--+-++---+-++-+-+-++++--++++---+++---++-+--+++--+++-++++++++++++-\\ ||||   ||    || ||||| |  || | |||| || | |||||| ',
   '|||  | |||   | | ||  /-+-+--+-++---+--+-++---+-++-+-+-++++--++++-\\ |||   || |  |||/-+++-++++++++++++-+-++++---++----++-+++++-+--++-+\\|||| || | |||||| ',
   '^||  | |||   | | ||  | | |  | ||   |  | ||   \\-++-+-+-++++--++++-+-+++---++-+--++++-+++-++++++++++++-+-++++---++----++-+++++-+--++-/||||| || | |||||| ',
   '|||  | |||   | | ||  | | |  | ||   |/-+-++-----++-+-+-++++--++++-+-+++---++-+--++++-+++>++++++++++++-+-++++---++----++-+++++-+\\ ||  ||||| || | |||||| ',
   '|||  | \\++---+-+-++--+-+-+--+-++---++-+-++-----++-+-+-++++--++/| | |||   || |  |||| ||| \\+++++++++++-+-++++---+/    || ||||| || |\\--+++++-++-+-+/|||| ',
   '|||  |  ||   | | ||  | | |  | ||   || | ||     || | | ||||  || | |/+++---++-+--++++-+++--+++++++++++-+-++++\\  |     || ||||| || |   ||||| || | | |||| ',
   '|||  |  ||   | | ||  | | |  | ||   || | ||    /++-+-+-++++--++-+-+++++--\\|| |  |||| |||  ||||||||||| | |||||  | /---++-+++++-++-+---+++++\\|| | | |||| ',
   '|||  |  ||   | | ||  | | |  | ||   || | ||    ||| | | ||||  || | |||||  ||| |  |||| ||\\--+++++++++++-+-+++++--+-+---++-+++++-++-+---++++++++-/ | |||| ',
   '|||  |  ||   | | || /+-+-+--+-++---++-+-++----+++\\| | ||||  || | |||||  |\\+-+--++++-++---+++++++++++-+-+++++--+-+---++-+++++-++-+---++/|||||   | |||| ',
   '|||  |  ||   |/+-++-++-+-+--+-++---++-+-++----+++++\\| ||||  || | |||||  | | |  |||| ||   ||||||||||| | |||||  | |   || ||||| || |   || |||||   | |||| ',
   '|||  |  ||   ||| || || | |  | ||   || | ||    ||||||| ||||  |\\-+-+++++--+-+-+--++++-/|   ||||||||||| | |||||  | |   || ||||| || |   || |||||   | |||| ',
   '|||  |  ||   |||/++-++-+-+--+-++---++-+-++----+++++++-++++--+--+-+++++--+-+-+--++++--+---+++++++++++\\| |||||  | |   || ||||| || |   || |||||   | |||| ',
   '|||  |  ||   |||||| || |/+--+-++---++-+-++----+++++++-++++--+--+-+++++--+-+-+--++++--+-\\ v|||||||||||| |||||  | |   || ||||| || |   || |||||   | |||| ',
   '|||  |  ||   |||||| || |||  | ||   || | ||    ||||||| ||||  |  | |||||  | | |  ||||  | | |||||||||||||/+++++--+-+---++-+++++-++-+---++-+++++---+-++++\\',
   '|||  |  ||   |||||| || |||/-+-++---++\\| ||    ||||||| ||||  |  \\-+++++--+-+-+--++++--+-+-+++++++++++++++++++--+-+---++-++++/ || |   || |||||   | |||||',
   '|||  |  ||   |||||| || |||| | ||   |||| ||    ||||||\\-++++--+----+++++--+-+-+--++++--+-+-++++++++++/||||||||  | |   || ||||  || |   || |||||   | |||||',
   '|||  |  ||   |||||| || |||| | ||   |||| ||    ||||||  ||||  |    |||||  | | |  |||v  \\-+-++++++++++-++++++/|  | |   || ||||  || |   || |||||   | |||||',
   '|||  |  ||  /++++++-++\\|||| |/++---++++-++----++++++--++++--+----+++++--+-+-+--++++----+-++++++++++-++++++-+--+-+---++-++++--++-+\\  || |||||   | |||||',
   '|||  |  ||  |\\+++++-+++++++-++++---++++-++----++++++--/||\\--+----+++/|  | | |  ||||    | |||||\\++++-++++++-+--+-+---++-++++--++-++--++-+++++---+-+/|||',
   '|||  |  ||  | ||||| ||||||| ||||   |||| ||  /-++++++---++---+----+++-+--+-+-+--++++----+-+++++-++++-++++++-+--+-+---++-++++--++\\||  || |||||   | | |||',
   '|||  |  ||  | ||||| ||||||| ||||   |||| ||  | ||||||   ||   |    ||| |  | | |  ||||    | ||||\\-++++-++++++-+--+-+---++-++++--+++++--+/ |||||   | | |||',
   '|||  \\--++--+-+++++-+++++++-++++---++++-++--+-++++++---++---+----+++-+--+-+-+--++++----+-++++--++++-+++/|| |  | |   || ||||  |||||  |  |||||   | | |||',
   '||| /---++--+-+++++-+++++++-++++---++++-++--+-++++++---++---+----+++-+--+-+-+--++++----+-++++-\\|||| ||| || |  | |   || ||||  |||||  |  |||||   | | |||',
   '||| |   ||  | ||||| ||||||| ||||   |||| ||  | ||||||   ||   |    ||| |  | | |  ||||    | |||| ||||| ||| || |  | |   || \\+++--+++++--+--++++/   | | |||',
   '||| |   ||  | ||||| ||||||| ||||   |\\++-++--+-++++++---++---+----+++-+--+-+-+--++++----+-++++-+++++-+++-++-+--+-+---++--+++--+/|||  |  ||||    | | |||',
   '||| |   ||  | ||||| ||||||| ||||/--+-++-++--+-++++++---++---+---\\||| |  | | | /++++----+-++++-+++++-+++-++-+\\ | |   ||  |||  | |||  |  ||||    | | |||',
   '|\\+-+---++--+-+++++-+++++++-+++++--+-++-++--+-++++++---++---+---++++-+--+-+-+-+++++----+-++++-+++++-+/| || || | |   ||  |||  | |||  |  ||||    | | |||',
   '| | |   ||  | ||||| ||||||| |\\+++--+-++-++--+-++++++---++---+---++++-+--+-+-+-+++++----+-++++-+++++-+-+-++-++-+-+--<++--+++--+-++/  |  ||||    | | |||',
   '| | |   ||  | ||||| |||\\+++-+-+++--+-+/ ||  | ||||||   ||   \\---++++-+--+-+-+-+++++----+-++++-+++++-+-+-++-++-+-+---++--+++--+-++---+--+/||    | | |||',
   '| | |   \\+--+-+++++-+++-+++-+-+++--+-+--++--+-++++++---++-------++++-/  | | | |||\\+----+-++++-+++++-+-+-++-++-+-+---++--+++--+-++---+--+-++----+-+-+/|',
   '| | |    |  | ||||| ||| ||| \\-+++--+-+--++--+-++++++---++-------++++----+-+-+-+++-+----+-++++-+++/| | | || || | |   ||  |||  | ||   |  | ||    | | | |',
   '| | |    |  | ||||| ||| |||   |||  | |/-++--+-++++++---++-------++++----+-+-+-+++-+----+-++++-+++-+-+-+-++-++-+-+---++--+++--+-++---+--+\\||    | | | |',
   '| | |    |  | ||||| ||| |||   |||  | || ||/-+-++++++---++-------++++----+-+-+-+++-+\\   | |||| ||| | | | || || | |   ||  |||  | ||   |  ||||    | | | |',
   '| | |    |  |/+++++-+++-+++---+++--+\\|| ||| | ||||||   ||     /-++++----+-+-+-+++-++---+-++++-+++-+-+-+-++-++-+-+---++--+++--+-++---+--++++\\   | | | |',
   '| | |    |  ||||||| ||| |||   |||  |||| ||| | ||||||   ||  /--+-++++----+-+-+-+++-++---+-++++-+++-+-+-+-++-++-+-+>\\ ||  |||  | ||   |  |||||   | | | |',
   '| | |    |  ||||||| ||| |||   |||  |||| ||| | ||||||   ||  |  | ||||    | \\-+-+++-++---+-++++-+/| | | | || || | | | ||  |||  | ||   |  |||||   | | | |',
   '| | |    |  ||||||| ||| |||   |||/-++++-+++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+-+-+-+-+-++-++-+-+-+-++--+++--+-++---+-\\|||||   | | | |',
   '| | |    |  ||||||| ||| |||   \\+++-++++-+++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+-/ | | | || || | | | ||  |||  | ||   | ||||||   | | | |',
   '| | |    |  ||||||| ||| |||    ||| |||| \\++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+---+-+-+-++-++-/ | | ||  |||  | ||   | ||||||   | | | |',
   '| | |  /-+--+++++++-+++-+++----+++-++++--++-+-++++++---++--+--+-++++----+---+-+++-++---+-++++-+---+-+-+-++-++---+-+\\||  |||  | ||   | ||||||   | | | |',
   '| | |  | |  ||||||| ||| |||    ||| ||||  || | ||\\+++---++--+--+-++++----+---+-+++-++---+-/||| |   | | | || ||   | ||||  |||  | ||   | ||||||   | | | |',
   '| | |  | |  ||||||| ||| |||    ||| ||||  || | || |||   ||  |  | ||||    |   | ||| ||   |  ||| |   | | | || ||   | ||||  |||  | ||   | ||||||   | | | |',
   '| | |  | |  |||\\+++-+++-+++----+++-++++--++-+-+/ |||   ||  |  | ||\\+----+---+-+++-++---+--+++-+---+-+-+-++-/|   | ||||  |||  | ||   | ||||||   | | | |',
   '| | |  | |  ||| ||| ||| |||    ||| ||||  || | |  |||   ||  |  | || |    |   | ||| ||   |  ||| |   | | | ||  |   \\-++++--+++--+-++---+-+++/||   | | | |',
   '| | |  | |  ||| ||| |\\+-+++----+++-++++--++-+-+--+++---++--+--+-+/ |    |   | ||| ||   |  ||| |   | | | ||  |     ||||  |||  | ||   | ||| ||   | | | |',
   '| | |  | |  ||| ||| | | |||    ||| ||||  || | |  |||   ||  |  | |  |    |   | ||| ||   |  ||| |   | | | ||  |     ||||  |||  | ||   | ||| ||   | | | |',
   '| \\-+--+-+--+++-+++-+-+-+++----+++-++++--++-+-+--+++---++--+--+-+--+----+---+-+++-++---+--+++-+---+-+-+-+/  |     ||||  |||  | ||   | ||| ||   | | | |',
   '|   |  | |  ||| ||| | | |||    ||| ||||  || | |  |||   ||  |  | |  |    |   | ||| ||   |  ||| |   | | | |   |     ||||  |||  | ||   | ||| ||   | | | |',
   '|   |  | |  ||| ||| | | |||    ||| ||||  || | \\--+++---++--+--+-+--+----/   | ||| ||   |  ||| |   | | | |   |     ||\\+--+++--+-++---+-+++-++---/ | | |',
   '\\---+--+-+--+++-+++-+-+-+++----+++-++++--++-+----+++---++--+--+-+--+--------/ ||| ||   |  ||| |   | | | |   |     || |  |||  | ||   | ||| ||     | | |',
   '    |  | |  ||| ||| | | |||    ||| ||||  || |    |||   ||  |  \\-+--+----------+++-++---+--+++-+---+-+-+-+---+-----++-+--+++--+-++---+-+++-+/     | | |',
   '    |  | |  ||| ||| | | \\++----+++-++++--++-+----+++---++--+----+--+----------+++-++---/  ||| |   | | | |   |     || |  |||  | ||   | |\\+-+------/ | |',
   '    |  | |  ||| ||| | |  ||    ||| ||||  || |    |||   ||  |    |/-+----------+++-++--\\   ||| |   | | | |   |     || |  |||  | ||   | | | |        | |',
   '    |  | |  ||| ||| | |  ||    ||| ||||  || |    |||   ||  |    || |          ||| ||  |   ||| |  /+-+-+-+---+-----++-+--+++--+-++---+-+-+\\|        | |',
   '    |  | |  ||| ||| | |  ||    ||| ||||  || |    |||   ||  |    || \\----------+++-++--+---+++-+--++-+-+-+---+-----++-+--+++--/ ||   | | |||        | |',
   '    |  | |  ||| ||| | |  \\+----+++-++++--++-+----+++---++--+----++------------+++-++--+---+++-+--+/ | | |   |     || |  |||    ||   | | |||        | |',
   '    |  | |  |\\+-+++-+-+---+----+++-+/||  || |    |||   ||  |    ||            ||| ||  |   \\++-+--+--+-+-+---+-----++-+--+++----+/   | | |||        | |',
   '    |  | |  | | ||| \\-+---+----+++-+-++--++-+----/||   ||  |    ||            ||| ||  |    || |  |  | | |   |     || |  |||    |    | | |||        | |',
   '    |  | |  | \\-+++---+---+----+++-+-++--++-+-----+/   ||  |    ||            \\++-++--+----++-+--+--+-+-+---/     || |  |\\+----+----+-+-+++--------/ |',
   '    |  | |  |   |||   |   v    ||| \\-++--++-+-----+----++--+----++-------------++-++--+----++-+--+--+-+-/         || |  | |    |    | | |||          |',
   '    |  | |  |   |||   |   |    |\\+---++--++-+-----+----++--+----/|             || || /+----++-+--+--+-+-----------++-+--+-+----+---\\| | |||          |',
   '    |  \\-+--+---+++---+---+----+-+---++--++-+-----+----++--+-----+-------------++-++-++----++-+--+--+-+-----------+/ |  | |    |   || | |||          |',
   '    |    |  |   |||   |   |    | |   ||  || |     |    |\\--+-----+-------------/| || ||    || |  |  | |           |  |  | |    |   || | |||          |',
   '    |    |  |   |||   |   |    | |   ||  || \\-----+----+---+-----+--------------+-++-++----++-+--+--+-+-----------+--+--+-+----/   || | |||          |',
   '    |    |  |   |||   |   |    | |   ||  ||       |    |   |     \\--------------+-++-+/    \\+-+--+--+-+-----------+--+--+-/        || | |||          |',
   '    |    |  |   |||   |   |    | |   ||  \\+-------+----/   |                    | || |      | |  |  | \\-----------+--+--+----------++-+-+++----------/',
   '    |    |  |   |\\+---+---+----+-+---++---+-------+--------+--------------------+-++-+------+-+--+--+-------------+--/  |          || | |||           ',
   '    |    \\--+---+-+---+---+----+-+---++---+-------+--------+--------------------/ || |      | |  |  |             |     |          || | |||           ',
   '    |       |   | |   |   |    | |   ||   |       |        \\----------------------++-+------+-+--+--+-------------/     |          || | |||           ',
   '    |       |   | |   |   |    | |   ||   |       |                               || \\------+-+--+--+-------------------+----------/| | |||           ',
   '    |       |   | |   |   |    | \\---++---+-------+-------------------------------++--------+-+--+--+-------------------+-----------+-/ |||           ',
   '    |       |   | |   |   |    |     ||   |       |                               ||        \\-+--+--+-------------------+-----------+---++/           ',
   '    |       \\---+-+---/   |    |     ||   |       |                               \\+----------+--+--+-------------------+-----------/   ||            ',
   '    \\-----------+<+-------+----+-----++---+-------+--------------------------------+----------/  |  |                   |               ||            ',
   '                \\-+-------+----+-----++---+-------+--------------------------------+-------------+--/                   |               ||            ',
   '                  |       \\----+-----/\\---+-------+--------------------------------+-------------+----------------------+---------------/|            ',
   '                  \\------------/          |       \\--------------------------------+-------------+----------------------/                |            ',
   '                                          \\----------------------------------------/             \\---------------------------------------/            '];
