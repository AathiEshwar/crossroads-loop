# Crossroads — First Loop | QA and design iteration

## Known project origin
- Candidate's original Figma Track Master Level 1 visual design: two overlapping rail loops, twin crossings, two trains, and a two-lap objective.
- Requested change: preserve Level 1's layout and style; adapt trains to cars, tracks to roads.
- Feedback on first road build: the site looked unlike the original screen, and dispatch required hitting small specific controls. Candidate specifically requested tap anywhere, blue first and red second.

## Changes in this build
- Restored the original portrait frame composition, blue Level 1 header, green landscape, scenery, numbered vehicle markers, and bottom blue panel.
- Redrew two courses at the original positions as asphalt roads, retaining both crossings.
- Replaced train visuals with small top-down blue and red vehicles.
- Changed input to the requested global two-tap order, with no post-launch tap-to-brake behavior.
- Added reachable date-seeded Daily Traffic variant after completing the level.

## Automated checks performed
- JavaScript syntax passed.
- Chromium rendered desktop and mobile states with zero script errors.
- First tap launched only the blue vehicle; second tap launched red. Extra taps did not change vehicle movement.
- A very short launch gap caused a collision; tested staggered launch gaps cleared both routes.
- Two-lap completion, star evaluation, win state, replay and the Daily Traffic control worked in browser tests.
- These are technical and simulated checks only, not an independent human playtest.

## Still to validate before submission
- Candidate should play the new version on the live site and confirm exact visual and input expectations.
- Ask a new player to try the puzzle without coaching and note whether the launch sequence is understandable.
- Record a first-session replay decision and whether a daily-speed variation gives any genuine reason to return the next day. Do not claim D1 retention until measured.
