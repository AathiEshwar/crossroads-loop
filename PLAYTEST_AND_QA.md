# Crossroads — QA Notes and Open Validation

## Iteration history

- Earlier browser build used more targeted dispatch controls; the requested update was to launch blue on the first tap anywhere in the play area, then red on the second.
- The visual layout was revised to more closely match the road-loop Figma screen, including the two crossings, scenery, portrait HUD and blue control panel.
- The browser version uses fixed road paths, deterministic car speeds and collision checks.

## Technical verification

- JavaScript syntax checks passed for the corrected game code.
- Prior local Chromium tests covered sequential dispatch, win/crash outcomes, replay, mobile rendering and the Daily Traffic option.
- This patch fixes Space/Enter restart after the result screen and prevents HUD reset/pause taps from incorrectly launching a vehicle before the second departure.

## Not yet validated

- The exact public Netlify deployment was not independently reachable from the auditing environment.
- No uncoached human sample or D1 retention measurement has been completed. Neither should be claimed in the submission.
- Before uploading to Lila, check the Netlify site in an incognito window and confirm both taps, collision, retry and Daily Traffic work there.
