# Füstteszt

Önálló, böngészős (Playwright / Chromium) regressziós teszt a játékhoz.

## Futtatás

```
node tests/smoke.mjs
```

Előfeltétel: Node 18+ és telepített `playwright` (chromium). A teszt maga indít egy helyi
statikus szervert egy szabad porton, nem módosít semmit a repóban.

## Mit ellenőriz (telefon fekvő 844x390 és asztali 1366x768 nézetben)

- konzol- és oldalhibák hiánya
- főmenü, `#btn-start`, hullám és szörnyek megjelenése
- tüzelés (Space / érintés): ölés, pontszám, kredit nő vagy szörny HP csökken
- bolt nyitás/zárás (`#btn-open-shop`, `#btn-back-game`, ESC), szünet/folytatás (`#btn-pause`, `#btn-resume`, P)
- hibakereső (F3), stresszteszt (`#dg-stress`), FPS mérés, E100–E600 kódok hiánya a naplóban
- felső HUD gombok: legalább 40x40 px, nem fedik egymást, nem lógnak ki

A játék állapotát az oldal `?debug` paraméterrel elérhető `window.__c1k` objektumából olvassa.

## Kimenet

PASS/FAIL táblázat; hiba esetén a kilépési kód nem nulla. Képernyőképek: `SHOT_DIR`
környezeti változóval megadott mappába (alapból a scratchpad) `test_*.png` néven.
