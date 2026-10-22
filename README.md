# Crossroads — First Loop

**Playable browser build:** https://crossroads-first-loop.netlify.app/  
**Source code:** https://github.com/AathiEshwar/crossroads-loop  
**Figma — Editable Crossroads Level 1:** https://www.figma.com/design/iMIs7jgF9j00ZbyrAcHUSx/CrossyRoads?node-id=0-1&t=nDBjwfcwqXX699B0-1

## What it is

Crossroads is a compact timing puzzle with two cars driving on fixed road loops that meet at two intersections. Both cars need to complete two laps without colliding. The player does not steer either vehicle; the deliberate choice is the departure time gap.

The portrait scene, road-loop arrangement, HUD hierarchy and color-coded vehicles are represented in my editable Figma design. The browser implementation uses HTML5 canvas and JavaScript.

## How to play

- Tap inside the playing area once to launch **blue**.
- Tap again to launch **red**.
- Both cars move automatically after launch. Further taps cannot change their movement.
- Keep their two crossing times separated long enough for both to complete two laps.
- The game ends on collision or after the 31-second limit. A successful clear earns one to three stars.
- On desktop, Space / Enter dispatches in the same sequence. The top-left control restarts and the top-right control pauses. Press R to restart.

## Daily Traffic

After a successful clear, the Daily Traffic option introduces a date-seeded speed variation and stores a local best time in the current browser. It is a designed replay incentive, **not verified D1 retention**.

## Implementation and design process

The underlying two-loop layout and portrait interface direction were designed in Figma before the browser prototype. I chose the road-crossing mechanic and specified tap-anywhere sequential dispatch. ChatGPT assisted with the HTML5 implementation, SVG and artwork adaptation, debugging, browser tests and documentation. No AI model is used at runtime. Collision detection, car movement, stars and speed variations follow deterministic rules.

## Verification scope

Code-level and local browser checks have covered the two-tap sequence, collisions, clearing both laps, retrying and the Daily Traffic state. Independent first-time player feedback and public-site version verification are still needed before making broader gameplay or retention claims.

## Files

- `index.html` — portrait-game page
- `style.css` — responsive frame styling
- `game.js` — deterministic game logic and canvas rendering
- `assets/valley-background.png` — scenery artwork
- `GAME_DESIGN_WRITEUP.md` — Question 1 rationale and plan
- `PLAYTEST_AND_QA.md` — technical-check summary and test limitations
