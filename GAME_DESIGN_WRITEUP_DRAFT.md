# Question 1 — Crossroads: First Loop (replaces Afterimage)

## Prototype links
Browser game: https://crossroads-first-loop.netlify.app/ 
GitHub: https://github.com/AathiEshwar/crossroads-first-loop
Original Figma Level 1: https://www.figma.com/design/iMIs7jgF9j00ZbyrAcHUSx/CrossyRoads?node-id=0-1&t=nDBjwfcwqXX699B0-1
## Pitch
Crossroads is a one-level timing puzzle adapted from a level I had already designed in Figma for Track Master. The original concept used trains and railway loops; for this prototype, I changed it to cars travelling along intersecting roads. There are two cars and two crossing points. Both vehicles must finish two laps. I do not steer them: my decision is when to launch the blue car and when to launch the red one, knowing their routes will intersect. The level is for players who enjoy quick, readable timing puzzles and replaying a short challenge to improve their time.

## Core loop and first session
The full interaction is deliberately small. The first tap anywhere launches blue. The second tap anywhere launches red. After that, both continue automatically. I watch whether my chosen time gap keeps them clear of the two intersections. A collision ends the attempt, while a successful two-lap clear awards one to three stars based on completion time. The player can instantly retry using a different departure gap. The puzzle should become understandable without reading a long tutorial.

## Progression and D1 hook
The prototype includes a Daily Traffic variation using the same level but date-seeded car speeds and a separate locally stored best time. This is only a potential return hook. I have not run a retention study or demonstrated that it brings players back the next day. For a larger game, my next step would be levels that change crossing count, route geometry and travel speed, without expanding the controls too quickly.

## Money
I would not monetize a single prototype. For a finished level-based mobile puzzle, I would test optional rewarded hints or cosmetic vehicle/road themes only after checking that the levels themselves are compelling. Any hint system must preserve the core timing decision; I would avoid selling a guaranteed win for difficult stages.

## AI and original work
The Track Master Figma layout and UI are my earlier design work. AI-assisted tooling was used to implement the web game, convert the visual theme from railway to road, debug interactions and simulate edge cases. It helped create a testable prototype quickly while I focused on specifying the gameplay and feedback I wanted. No AI runs at game time. Any first-person statement about personally playing this revised build should be added only after I have actually done so.

## Shipping and validation
First I'd verify that a new player understands that the two taps launch vehicles in a fixed blue-then-red order. Then I'd watch whether they retry after a collision and whether the star thresholds encourage improvement instead of frustrating the player. At a small soft launch I'd watch first-session replay rate and D1 retention, and track failure points, launch-gap distributions and average completion time. If almost everyone wins on the first attempt, I would increase the sensitivity of the crossing timing. If players lose without understanding why, I would improve the crossing warning or slow the initial speeds.

## Reference material
Primary design reference: my own Track Master Level 1 Figma frame. Relevant genre references and personal comparisons should be added only after confirming which timing or traffic-management puzzle games were actually played and analyzed. Avoid inventing games as personal experience.

*This is a draft for review after gameplay testing, not a statement of validated commercial or retention performance.*
