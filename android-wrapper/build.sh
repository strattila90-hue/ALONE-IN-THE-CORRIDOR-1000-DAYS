#!/usr/bin/env bash
# APK építés Ubuntu-n: sudo apt-get install aapt apksigner zipalign dalvik-exchange android-sdk-platform-23
# Használat: KS=/út/corridor-release.jks KS_PASS=... ./android-wrapper/build.sh
set -euo pipefail
cd "$(dirname "$0")"
AJ=/usr/lib/android-sdk/platforms/android-23/android.jar
OUT=$(mktemp -d)
mkdir -p "$OUT/assets" "$OUT/gen" "$OUT/obj"
cp ../index.html ../manifest.json ../icon.svg "$OUT/assets/"
aapt package -f -M AndroidManifest.xml -S res -A "$OUT/assets" -I "$AJ" -J "$OUT/gen" -F "$OUT/unsigned.apk" -0 arsc
javac --release 8 -nowarn -classpath "$AJ" -d "$OUT/obj" "$OUT"/gen/R.java src/hu/corridor1000d/MainActivity.java
dalvik-exchange --dex --min-sdk-version=21 --output="$OUT/classes.dex" "$OUT/obj"
(cd "$OUT" && zip -q unsigned.apk classes.dex)
zipalign -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"
apksigner sign --ks "$KS" --ks-key-alias corridor --ks-pass "pass:$KS_PASS" --key-pass "pass:$KS_PASS" --out ../download/corridor-1000d.apk "$OUT/aligned.apk"
echo "Kész: download/corridor-1000d.apk"
