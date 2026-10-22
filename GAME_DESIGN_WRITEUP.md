# Question 1 — Playable Prototype

CROSSROADS — First Loop  |  Two-car road-crossing timing puzzle

Playable browser game: https://crossroads-first-loop.netlify.app/

GitHub source: https://github.com/AathiEshwar/crossroads-loop

Figma reference: https://www.figma.com/design/iMIs7jgF9j00ZbyrAcHUSx/CrossyRoads?node-id=0-1&t=nDBjwfcwqXX699B0-1

## Pitch — concept, audience and design origin

Crossroads is a one-level mobile timing puzzle built around two road circuits that intersect at two points. There is a blue car on one circuit and a red car on the other. Each vehicle needs to finish two laps without a collision. The player does not steer either car. The only strategic input is the time gap between their departures. I wanted to find out whether such a small set of controls could still produce an interesting decision.

I had previously worked out the overlapping-loop level arrangement and portrait-screen hierarchy in Figma. For Crossroads, I chose road geometry, two color-coded vehicles, visible crossing points and a clear dispatch sequence. The intended audience is players who enjoy short timing puzzles where success comes from observing the screen, making a decision and improving it on the next attempt.

## Core loop and the first session

Read the two road circuits → tap anywhere to launch the blue car → decide how long to wait → tap anywhere again to launch the red car → watch both intersections → finish two laps or crash → retry with a different departure gap. Once both cars are moving, additional taps do not change their speed or route. The puzzle is about dispatch timing rather than steering.

The first session contains only one level. Blue always starts before red. Both cars use fixed routes and predictable movement speeds. If they reach the same crossing at nearly the same moment, the run ends. Completing two laps earns one to three stars based on time, while the 31-second limit prevents waiting indefinitely. The mobile input is tap-anywhere; Space or Enter provides the same dispatch order on desktop.

## What I changed during prototyping

My first playable road version did not resemble the screen I had in mind. The two circuits, scenery, UI proportions and blue control panel needed to look more consistent with my Figma composition. I requested a closer portrait layout, stronger visual separation between both roads and cars, and clearly visible intersection markings. These revisions made the level easier to scan at a glance.

I also simplified the controls. The initial road prototype relied on more targeted interactions, but I wanted players to concentrate on the launch gap instead of searching for a button. The updated interaction uses the first tap anywhere to dispatch blue and the second to dispatch red. These changes came from my review of the prototype; browser checks confirm the sequence works, but independent player testing is still needed.

## Day-1 hook and longer progression

The immediate replay reason is straightforward: try a different departure gap, avoid the collision and earn more stars. After the first clear, Daily Traffic offers a date-seeded speed variation and a separate best time stored in that browser. It is a proposed day-one return hook, not a measured retention result.

If the one-level prototype shows potential, I would add new road layouts with different crossing distances, route lengths, speed relationships and eventually more complicated traffic patterns. I would preserve the simple controls until there is a clear gameplay reason to introduce another action. Long-term depth should come from timing problems, not a crowded interface.

## Money — avoiding a cash grab

There are no purchases or advertisements in this prototype. For a complete mobile puzzle game I would first validate replayability, then consider cosmetic car designs, environment themes or optional hints that explain a timing mistake. I would avoid selling collision immunity or an automatic clear because those remove the decision the game is meant to test.

## AI — what was used, why and whether it is in the game

I developed the initial intersecting-loop level arrangement and interface direction in Figma and made the decision to create a car-based road puzzle for this assignment. I specified the simple blue-then-red tap sequence, evaluated the first playable version and requested changes to the road layout, visual hierarchy and controls. ChatGPT supported the HTML5 canvas implementation, helped translate the artwork into editable road and car elements, debugged collision and input behavior, ran browser checks and organized the write-up. I used that assistance to reach a testable build more quickly while I evaluated the design. The code and SVG conversion were AI-assisted; I am not claiming to have written every implementation detail by hand.

No AI model operates during play. Each car follows a fixed path, and collision detection, daily speed changes and star scores are calculated through deterministic JavaScript. That keeps the result consistent: the departure timing, rather than unpredictable behavior, is the variable being tested.

## Shipping — first tests, pivot conditions and metrics

My first user test would involve handing the game to someone unfamiliar with it and observing whether they recognize the launch order, anticipate the two crossings and understand why a collision happened. I would then see whether they choose to retry without being prompted and whether the star scores motivate them to improve. This needs testing with new players rather than only developer and browser checks.

At a small launch I would prioritize first-session retry rate and D1 retention. I would also record dispatch gaps, completion times, collision locations, stars earned and how many attempts are needed for a clear. If most people win immediately without thinking about timing, the challenge may be too forgiving. If players repeatedly fail without understanding why, I would improve crossing feedback before increasing difficulty.

## Reference games and design decisions

My primary design foundation is the overlapping two-circuit level composition and portrait UI hierarchy that I created in Figma. The road-crossing screen is now provided as an editable SVG so I can continue refining it in a separate Figma file. The two road circuits, two launch points and crossing positions are deliberate: they let a player see the full problem without moving a camera or learning several controls.

Clash Royale and Dota 2 are games I have played and can discuss as comparisons, not direct templates. Clash Royale shows how timing can matter even when the input is simple; Crossroads reduces that idea to a two-action, single-player timing problem. Dota 2 makes positioning and timing consequential, but I intentionally leave out its combat complexity. Neither is presented as an example of this exact road-crossing mechanic.



**Technical note:** Gameplay tests to date were development/browser checks; no measured day-one retention is claimed.
