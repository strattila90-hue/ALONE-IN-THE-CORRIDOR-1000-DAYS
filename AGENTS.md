# ⚠️ NOTICE TO ALL AI ASSISTANTS / FIGYELMEZTETÉS MINDEN MI-NAK

**Read this before touching any file. / Olvasd el, mielőtt bármely fájlhoz nyúlsz.**

This repo is **ALONE IN THE CORRIDOR: 1000 DAYS** – a 16-bit retro pixel-art sci-fi survival-horror defense shooter (HTML5 Canvas + vanilla JS, PWA, Hungarian UI).
The current version is the owner's **accepted baseline**. You may change it **only to make it better**, and **never away from the main direction**.

## Main direction (DO NOT change)
- **Genre/style:** real retro pixel art, tech-noir survival horror, CRT/scanline feel, low-res pixel renderer (buffer upscaled with nearest-neighbor).
- **Setting:** abandoned cargo spaceship (ISV Hollow Mary), rust, hazard stripes, containers, pulsing flesh growths, slime, blood.
- **Gore:** blood, slime, flesh chunks (gibs that bounce and stay on the floor), blood decals.
- **Monsters:** drawn from horror references – long limbs, exposed ribs, exposed brain, human–monster hybrids (skull faces, faceless, brain-frog, skull-millipede boss).
- **Gameplay:** left-to-right defense behind a barricade, waves + boss every 5th wave, credits, armor/exosuit tiers, many weapons.
- **UI:** metal/rust panels, stepped pixel corners, chunky pixel buttons, hazard-stripe fire button. Hungarian language.
- **Platform:** landscape mobile-first PWA, offline (service worker), PWABuilder/APK compatible, plus a laptop/desktop layout.

## Hard rules
1. **Only improve. No regressions.** Everything listed below must still exist and work after your change.
2. **Do not rewrite from scratch**, do not swap the art style, theme, language, genre, or tech stack (no frameworks, no build step, no external assets/CDNs – must work offline).
3. **Do not remove or nerf** existing weapons, enemies, buttons, upgrades or screens without an explicit request from the owner.
4. Prefer **small, targeted edits**. Keep `index.html` self-contained.
5. **Bump `CACHE_NAME` in `sw.js`** on every change that touches shipped files, so installed PWAs update.
6. Keep touch controls (joystick, FIRE, AUTO, weapon switch) and keyboard controls working; keep phone and laptop layouts usable.
7. Before finishing: syntax-check the script (`node --check`), and make sure the game starts, a wave spawns, shooting works, the shop opens, pause works.
8. If unsure whether something is an improvement or a change of direction – **leave it as is and ask the owner.**

## Feature checklist (must remain)
- 16 weapons (shotgun … singularity, incl. flamethrower, minigun, rocket launcher, bio cannon, nail gun, saw launcher, chain tesla, napalm mortar) with per-weapon **fire-rate and damage upgrades** (Armory / Fegyvertár), per-weapon projectile kinds and status effects (burn/slow/stun/acid/knockback), visible gun model in the hero's hands
- **Autonomous machine-gun turret** (4 upgrade levels) in the Barricade & Systems tab
- Armor tiers, barricade upgrades/repair, cooling, magnet upgrades, heat system
- 10 enemy types + Leviathan boss, gibs/blood/slime effects, shaded wet-look monster sprites (finishSprite), corpses, glowing eyes, breathing/twitch, wounds
- Extra monsters: Nyurga (tall long-limbed human), Csigaszörny (snail), Kiborg-Bio (cyborg), Polip-Isten (Cthulhu-like octopus)
- Animated noir 2D title-screen illustration (canvas #title-art) with soldier + monster line-up
- Exosuit-human hero sprite (detailed, with backpack) that changes per armor tier (4 looks)
- **Pause button (⏸ / P key)**, **Refresh/update button (⟳)** that clears caches and reloads, UI size − / + setting
- Audio engine (Web Audio synth), mute button, diagnostics button
- PWA: `manifest.json` (landscape, fullscreen), `sw.js`, `icon.svg`
- v8 horror systems: **fear meter** (darkness, hallucinations, whispers, trembling aim), flashlight-cone lighting + glowing eyes, blackout events, raj-roham surges, jump scares (toggle in settings), story log (diary line per day), hero barks
- v8 meat-grinder: combo tiers (VÉRFÜRDŐ … 1000 NAP DÜHE), sprite-shatter gibs baked into a persistent floor layer, hit-stop, grenade (G), adrenaline (F)
- v8 UI/controls: main menu views (Napló, Irányítás, Beállítások), custom riveted `.hbtn` buttons, settings persisted (`c1k_settings`), records (`c1k_best`), floating joystick, multitouch-safe fire, tap-anywhere-right fire, mouse aim, number keys/wheel, gamepad, weapon strip
- Pixel buffer uses PX=2 so the 34px hero/monster sprites stay 1:1 (don't raise PX again)
- v13 performance & debug: cached static corridor background, single glow sprite for all lights (no per-light gradients), x-grid projectile collision, effect LOD when >80 monsters (`state.heavy`), audio voice budget + cached noise buffers – 300+ monsters must stay smooth
- v13 **built-in debugger** (📊 / F3 / tap the FPS meter) with error codes E100–E600 / W700–W703, copyable report, stress test (+100 monsters), quality AUTO/HIGH/LOW; **FPS meter** (setting); **blood drying** speed setting (GYORS/NORMÁL/LASSÚ); compact one-row HUD on short screens, raised floor (bigger play area)
- v14 late-game: 5 extra monster types – Bőrtelen Kopó (hound, packs, day 8+), Pókanya (spider, zig-zag, day 7+), Puffadt Hulla (bloat, acid burst on death, day 10+), Sziámi Iker (twin, splits in two, day 12+), Hústorony (tower, heals nearby monsters, day 15+); higher spawn ceiling from day 8 (up to 200), bigger packs, **HORDA-ÉJSZAKA** every 3rd non-boss day from day 9 (40 + 4×day monsters)
- v15 mobile GPU: sprite chunks computed on CPU in finishSprite (no getImageData on GPU canvases in-game), sprites/silhouettes prewarmed in the menu, HUD bars use transform (no layout), target-time 60 FPS limiter (90 Hz safe), faster auto-low-quality (hides CSS scanlines), version + display Hz in debugger/report

## Ideas that fit the direction (welcome)
Better hero sprite, redrawn barricade, boss animations, more monster hybrids, story screens between waves, custom icon, save/high-score, more gore polish, performance tuning.
