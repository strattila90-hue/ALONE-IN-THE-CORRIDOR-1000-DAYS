# ALONE IN THE CORRIDOR: 1000 DAYS

> ⚠️ **MI-asszisztensek / AI assistants:** olvasd el az [`AGENTS.md`](./AGENTS.md) fájlt módosítás előtt – a jelenlegi verzió csak javítható, a fő irányzattól nem térhet el.

16-bites retro sci-fi **Tech-Noir Survival Horror** akció-túlélőjáték HTML5 Canvas és Vanilla JavaScript alapokon — mobil-első (landscape) kialakítással, offline PWA támogatással és PWABuilder APK-kompatibilitással.

## 📲 Android APK letöltése

**[⬇ corridor-1000d.apk letöltése](https://github.com/strattila90-hue/ALONE-IN-THE-CORRIDOR-1000-DAYS/raw/main/download/corridor-1000d.apk)**

1. Nyisd meg a fenti linket a telefonon, töltsd le az APK-t.
2. Koppints rá, és engedélyezd a „telepítés ismeretlen forrásból” opciót a böngésződnek / fájlkezelődnek.
3. Telepítés után a **Corridor 1000D** ikonnal indul, fekvő teljes képernyőn, internet nélkül is.

**Automatikus frissítés:** az app minden induláskor letölti a legújabb játékverziót ebből a repóból (`main` ág). Ha a főmenüben vagy, azonnal frissül, különben a következő indításkor. Új APK-t csak akkor kell telepíteni, ha maga az Android-burkoló változik (`android-wrapper/`).

## Mit tartalmaz a repó?

- `index.html` — A teljes, önállóan futtatható játék (2D pixel-art sprite motor, Web Audio API szintetizátor, érintőképernyős és billentyűzetes irányítás).
- `manifest.json` — PWA telepítési és PWABuilder metaadatok (fekvő tájolás, teljes képernyős mód).
- `sw.js` — Service Worker az offline gyorsítótárazáshoz.
- `icon.svg` — Vektoros alkalmazásikon a kezdőképernyőhöz és APK csomagoláshoz.
- `README.md` — Telepítési és élesítési leírás.
- `download/corridor-1000d.apk` — Kész, aláírt Android telepítő.
- `android-wrapper/` — Az APK forrása (WebView-burkoló automatikus frissítéssel) és `build.sh`.

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

## Horror frissítés (v18)

- **Felső sáv:** csak két egyforma, horror stílusú gomb maradt: **BOLT** és **MENÜ**. A MENÜ alól véres, előkúszó lenyíló menü jön elő: folytatás, fegyvertár, hang, beállítások, méret, hibakereső, frissítés, újrakezdés, főmenü. Ha mellé koppintasz, folytatódik a játék.
- **Horror bolt:** sötét, rozsdás, vérző stílus. A fejlesztőgombok egyformák, mind elérhető (telefonon is görgethető), és mindegyiken látszik egy szintsáv (pl. `7/20`).
- **2× több fejlesztés:** tűzgyorsaság és sebzés 20 szint, hűtés és kritikus 10 szint. A páncélmodulok 20 szintesek (a szervómotor 10). Fél úton ⭐ MESTER (+15%), maxon ⭐⭐ LEGENDA (+30%).
- **Több gusztustalanság:** spriccelő artériás vér, vonszolt vércsík, pattanó gennyhólyagok, epehányás, kifolyó belek, nyüvek, rángatózó hullák, leszakadó fej, kettéhasadó test, vér a barikádon és a képernyő szélén.
- **Váratlan fordulatok** (a 2. naptól, ritkán): feltámadó hulla, parazitákra szétrobbanó szörny, szellőzőből lehulló szörnyek, áramszünetben előreugró szörny, megmozduló hullakupac.
- **Félelmetesebb hangok:** a félelemmel sötétülő hajózúgás, fémnyikorgás, nedves hörgés, sikolyok, ijesztő hangeffektek a meglepetéseknél, fröccsenés, pukkanás, halálhörgés, csontroppanás, belek hangja. A 26 fegyvernek saját hangja van.

## Új kinézet (v17)

- **Saját rajzolt ikonok** minden gombon (SVG, offline), emoji helyett.
- **Nagy, lekerekített, élénk színű gombok**: felül 54 px (telefonon 46 px), funkció szerint színezve: bolt narancs, hang türkiz, szünet lila, frissítés zöld, hibakereső rózsaszín.
- **Egyértelműbb vezérlés**: a bal oldali gombokon név és állapot is látszik (AUTO BE/KI, FEGYVER, GRÁNÁT KÉSZ, ADRENALIN %), a szünet gomb ikonja ▶-ra vált.
- **Reagáló gombok**: minden gomb benyomódik, felvillan egy fénygyűrű, és rövid rezgést ad.
- **Élethűbb szörnyek**: térhatású árnyékolás, nedves fények, erezet, áttetsző vörös hús, járás közbeni dőlés, lüktető szemek és csorgó nyál. 300+ szörnynél is 60 FPS.
- **Önálló teszt**: `node tests/smoke.mjs` (lásd `tests/README.md`).

## Fegyverek, páncélok, fejlesztések (v16)

- **26 fegyver** – 10 új, filmes fegyver: Kézi Ágyú Revolver, Dobtáras Harci Sörétes, Sárkánylehelet Sörétes (gyújtósörét), Vöröslézer Gatling, Bálnavadász Szigonyágyú (láncos szigony, 6 átütés), Négycsövű Rakétaraj (4 önirányító rakéta), Ionvihar Projektor (10-es villámlánc), Kazettás Pokolakna (6 kisbomba), Nap-Lándzsa Orbitális Lézer (széles aranysugár), Antianyag Megsemmisítő (óriás vonzó gömb).
- **🎬 Filmes lövések**: a nehézfegyverek fényvillanással, lökéshullám-gyűrűvel és szikrazáporral lőnek (a villanás a Képernyőrázás beállítással kapcsol ki).
- **Fegyverfejlesztés fegyverenként 4 ágon**: ⚡ tűzgyorsaság 10 szint, 💥 sebzés 10 szint, ❄️ hűtés 5 szint, 🎯 kritikus 5 szint. Ha mind maxon van: **⭐ MESTER** (+15% sebzés).
- **8 páncélszint** (új: Bastion, Spectre, Juggernaut, Leviatán-Csontpáncél), mind saját hős-kinézettel.
- **Páncélmodulok**: 🧱 Páncéllemez, 🔋 Pajzskondenzátor, ♻️ Pajzs-regenerátor (10–10 szint), 🦿 Szervómotorok (5 szint).
- **Egységes ikongombok**: minden gomb piktogram, azonos méretű, nagy érintési felülettel; a HUD feliratai ikonok lettek, így kisebb helyet foglal.
- **Verziószám**: a főmenüben, a szünet-menüben és játék közben a sarokban (pl. `v16`).

## Késői napok (v14)

| Nap | Új szörny | Különlegesség |
|---|---|---|
| 7+ | **Pókanya** | Cikcakkban oldalaz, nehéz eltalálni |
| 8+ | **Bőrtelen Kopó** | Nagyon gyors, mindig 3–6-os falkában jön |
| 10+ | **Puffadt Hulla** | Szívós; szétdurranva savat fröcsköl és rongálja a barikádot |
| 12+ | **Sziámi Iker** | Halálakor két Kúszóra válik szét |
| 15+ | **Hústorony** | Óriás; 4,5 mp-enként gyógyítja a közeli szörnyeket – őt öld meg először! |

A 8. naptól nagyobb hordák jönnek (egyszerre akár 200 szörny), és minden 3. nem-főellenséges napon (9., 12., 18., 21. …) **HORDA-ÉJSZAKA**: 40 + 4×nap szörny tör rá a barikádra.

## Sebességmérő és hibakereső (v13)

- Alul középen (asztalon jobb alsó sarokban) a **sebességmérő**: `FPS · képkocka-idő`. Zöld ≥ 50, sárga ≥ 30, piros < 30 FPS. Kikapcsolható: Beállítások → Sebességmérő.
- Koppints rá (vagy **F3** / 📊) → **Hibakereső**: élő mérések (logika/rajzolás ms, szörnyek, részecskék), hibanapló hibakódokkal, `+100 SZÖRNY` stresszteszt, grafikai minőség (AUTO / MAGAS / ALACSONY), `MÁSOLÁS` (hibajelentés vágólapra).

| Kód | Jelentés |
|---|---|
| E100 | JavaScript-hiba a játékban |
| E101 | Kezeletlen aszinkron (Promise) hiba |
| E200 | Játéklogika hiba (update) |
| E201 | Kirajzolási hiba (render) |
| E300 | Hangmotor nem indult |
| E400 | Mentés sikertelen (localStorage) |
| E500 | Frissítés / Service Worker hiba |
| E600 | Grafikus vászon elveszett |
| W700 | Alacsony FPS (30 alatt, 3 mp-ig) |
| W701 | Akadás: 120 ms-nál hosszabb képkocka |
| W702 | Automatikus minőségcsökkentés bekapcsolt |
| W703 | Effekt-limit elérve (részecskék ritkítva) |

A **vér felszáradása** (Beállítások): GYORS (~10 mp, alapértelmezett) / NORMÁL / LASSÚ.

## Élesítés (GitHub Pages / Vercel) és Android APK

1. Töltsd fel az összes fájlt (`index.html`, `manifest.json`, `sw.js`, `icon.svg`, `README.md`) a GitHub repód gyökerébe.
2. Kapcsold be a **GitHub Pages**-t (*Settings -> Pages -> Branch: main / root*), vagy importáld a repót **Vercel**-be.
3. A kapott HTTPS címet másold be a [PWABuilder](https://www.pwabuilder.com/) oldalra az Android `.apk` telepítőcsomag legenerálásához.