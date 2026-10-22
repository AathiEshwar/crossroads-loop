# Crossroads — First Loop (Lila Games Q1 playable prototype)

**Browser build:** https://crossroads-first-loop.netlify.app/ 
**Source repository:** https://github.com/AathiEshwar/crossroads-first-loop

**Original UI / level designed in Figma:** https://www.figma.com/design/iMIs7jgF9j00ZbyrAcHUSx/CrossyRoads?node-id=0-1&t=nDBjwfcwqXX699B0-1

## Concept

A single-level, timing-based road puzzle built by adapting the creator's existing Track Master Level 1 layout. Two vehicles drive fixed intersecting loops. The player cannot steer; the key decision is how long to wait between dispatching the cars. Both need to finish two laps without meeting at either intersection.

## Controls — deliberate change from previous version

- **First tap anywhere on the game screen:** launch the BLUE car.
- **Second tap anywhere on the game screen:** launch the RED car.
- Both cars then continue automatically. More taps **do not brake** or change their speeds.
- On desktop, Space or Enter performs the same sequential dispatch.
- After both cars are launched, the top-left icon restarts; the top-right icon pauses.
- After a result, tap outside the Daily Traffic button to retry, or tap that button to play the date-seeded variation.

## Game rules

- One level, two closed roads, two shared intersections, two laps per vehicle.
- Cars crash if they occupy the same crossing too closely.
- The clock begins with the blue-car launch; the run must finish within 31 seconds.
- Star ratings: 3 stars for <=19s, 2 for <=23s, otherwise 1 for a clear.
- Completion unlocks the visible **Daily Traffic** challenge: the same level with speeds that change by date and a local best time.
- Scores and clear state are saved only in the player's browser. No login/backend is used.

## Why this approach

The original Figma layout is compact and visual. Only the transport theme changed from trains and rails to cars and roads; the location of the two loops and crossing points, level hierarchy, scenery and lower panel were kept as close to the original design as practical. The main change to the controls was requested after testing the first road prototype: players can now tap anywhere in sequence rather than targeting small vehicle buttons.

## Technical implementation

HTML5 canvas, vanilla JavaScript and CSS; no frameworks, servers or generated runtime scripts. Each car follows a sampled, closed Bezier path at a deterministic speed. Collision checks compare vehicle world positions as they enter the two shared areas. Desktop and mobile render the same portrait scene.

The bundled valley background was adapted from the original candidate-designed Figma Level 1 screenshot to keep the artwork consistent, with train/rail regions cleaned and replaced by live-drawn roads and cars.

## AI disclosure

The candidate designed the original Track Master UI and level before this assignment, and requested a road-based version with tap-anywhere sequential vehicle dispatch. ChatGPT helped implement the playable HTML5 prototype, adapt visual assets, test collision outcomes, and prepare documentation. No AI model is running in the game. Gameplay enjoyment and D1 retention have not been validated beyond developer/browser checks and need independent player testing.

## Deployment

Upload `index.html`, `game.js`, `style.css` and the `assets/` directory at the site's root. If using Netlify Drop, deploy the ZIP archive containing those items. Changing the site name alone will not update its contents.
