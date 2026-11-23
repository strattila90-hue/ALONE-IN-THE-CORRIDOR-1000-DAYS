# ALONE IN THE CORRIDOR: 1000 DAYS

> ⚠️ **MI-asszisztensek / AI assistants:** olvasd el az [`AGENTS.md`](./AGENTS.md) fájlt módosítás előtt – a jelenlegi verzió csak javítható, a fő irányzattól nem térhet el.

16-bites retro sci-fi **Tech-Noir Survival Horror** akció-túlélőjáték HTML5 Canvas és Vanilla JavaScript alapokon — mobil-első (landscape) kialakítással, offline PWA támogatással és PWABuilder APK-kompatibilitással.

## Mit tartalmaz a repó?

- `index.html` — A teljes, önállóan futtatható játék (2D pixel-art sprite motor, Web Audio API szintetizátor, érintőképernyős és billentyűzetes irányítás).
- `manifest.json` — PWA telepítési és PWABuilder metaadatok (fekvő tájolás, teljes képernyős mód).
- `sw.js` — Service Worker az offline gyorsítótárazáshoz.
- `icon.svg` — Vektoros alkalmazásikon a kezdőképernyőhöz és APK csomagoláshoz.
- `README.md` — Telepítési és élesítési leírás.

## Irányítás

- **Mobil / Érintőképernyő:**
  - Bal alsó virtuális joypad: mozgás fel-le és előre-hátra a barikád mögött.
  - Jobb alsó `TŰZ` gomb: tüzelés balról jobbra.
  - `🎯 AUTO` gomb: folyamatos automata tüzelés be-/kikapcsolása.
  - `🔄 FEGYVER` gomb: gyors váltás a feloldott fegyverek között.
  - Lebegő joystick: ahol a bal oldalon hozzáérsz, ott jelenik meg.
  - A képernyő jobb oldalán bárhol nyomva tartva is tüzelsz (az ujjad felé célozva).
  - `💣 GRÁNÁT`, `⚡ ADRENALIN`, fegyversáv a közvetlen fegyverválasztáshoz.
- **Asztali gép / Billentyűzet:**
  - `W A S D` vagy `Nyilak`: mozgás
  - `Szóköz` / bal egér: tüzelés (egérrel célzás)
  - `Q`, egérgörgő, `1–9`, `0`: fegyverváltás
  - `G` / jobb egér: gránát • `F`: adrenalin • `E`: auto-tűz • `P`: szünet
  - `ESC`: taktika / bolt menü
- **Kontroller:** bal kar mozgás, jobb kar célzás, A/RT tűz, LB/RB fegyver, X gránát, Y adrenalin, Start szünet.

## Élesítés (GitHub Pages / Vercel) és Android APK

1. Töltsd fel az összes fájlt (`index.html`, `manifest.json`, `sw.js`, `icon.svg`, `README.md`) a GitHub repód gyökerébe.
2. Kapcsold be a **GitHub Pages**-t (*Settings -> Pages -> Branch: main / root*), vagy importáld a repót **Vercel**-be.
3. A kapott HTTPS címet másold be a [PWABuilder](https://www.pwabuilder.com/) oldalra az Android `.apk` telepítőcsomag legenerálásához.