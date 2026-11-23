package hu.corridor1000d;

import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * ALONE IN THE CORRIDOR: 1000 DAYS – Android burkoló.
 * A játék beépítve, offline is fut. Induláskor a háttérben letölti a legfrissebb
 * index.html-t a GitHub main ágáról; ha újabb, a főmenüben azonnal, különben a következő indításkor él.
 */
public class MainActivity extends Activity {
    private static final String UPDATE_URL =
            "https://raw.githubusercontent.com/strattila90-hue/ALONE-IN-THE-CORRIDOR-1000-DAYS/main/index.html";
    private WebView web;
    private File cached;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON | WindowManager.LayoutParams.FLAG_FULLSCREEN);
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#05070b"));
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportZoom(false);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return !url.startsWith("file:");
            }
        });
        setContentView(web);
        hideSystemUi();

        cached = new File(new File(getFilesDir(), "game"), "index.html");
        if (cached.exists() && cached.length() > 50000) web.loadUrl("file://" + cached.getAbsolutePath());
        else web.loadUrl("file:///android_asset/index.html");
        checkForUpdate();
    }

    private void checkForUpdate() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection c = null;
                try {
                    c = (HttpURLConnection) new URL(UPDATE_URL + "?t=" + System.currentTimeMillis()).openConnection();
                    c.setConnectTimeout(8000);
                    c.setReadTimeout(15000);
                    c.setUseCaches(false);
                    if (c.getResponseCode() != 200) return;
                    InputStream in = c.getInputStream();
                    ByteArrayOutputStream out = new ByteArrayOutputStream();
                    byte[] buf = new byte[16384];
                    int n;
                    while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                    in.close();
                    byte[] data = out.toByteArray();
                    String head = new String(data, 0, Math.min(data.length, 4000), "UTF-8");
                    if (data.length < 50000 || !head.contains("ALONE IN THE CORRIDOR")) return;
                    String tail = new String(data, Math.max(0, data.length - 200), Math.min(200, data.length), "UTF-8");
                    if (!tail.contains("</html>")) return;
                    if (cached.exists() && cached.length() == data.length && sameAs(cached, data)) return;
                    File dir = cached.getParentFile();
                    if (!dir.exists()) dir.mkdirs();
                    File tmp = new File(dir, "index.tmp");
                    FileOutputStream fo = new FileOutputStream(tmp);
                    fo.write(data);
                    fo.close();
                    if (!tmp.renameTo(cached)) return;
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() { reloadIfOnMenu(); }
                    });
                } catch (Exception ignored) {
                } finally {
                    if (c != null) c.disconnect();
                }
            }
        }).start();
    }

    private static boolean sameAs(File f, byte[] data) {
        try {
            java.io.FileInputStream in = new java.io.FileInputStream(f);
            byte[] old = new byte[(int) f.length()];
            int off = 0, n;
            while (off < old.length && (n = in.read(old, off, old.length - off)) > 0) off += n;
            in.close();
            return java.util.Arrays.equals(old, data);
        } catch (Exception e) {
            return false;
        }
    }

    private void reloadIfOnMenu() {
        web.evaluateJavascript(
                "(function(){var s=document.getElementById('start-screen');return s&&s.classList.contains('active')?'menu':'game';})()",
                new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String v) {
                        if (v != null && v.contains("menu")) web.loadUrl("file://" + cached.getAbsolutePath());
                    }
                });
    }

    private void hideSystemUi() {
        if (Build.VERSION.SDK_INT >= 19) {
            web.setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemUi();
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript(
                "(function(){function a(id){var e=document.getElementById(id);return e&&e.classList.contains('active');}"
                        + "if(a('menu-modal')){document.getElementById('btn-back-game').click();return 'ok';}"
                        + "if(a('gameover-screen')){document.getElementById('btn-go-menu').click();return 'ok';}"
                        + "if(a('start-screen')){var m=document.getElementById('mv-main');"
                        + "if(m&&!m.classList.contains('active')){var b=document.querySelector('#start-screen .menu-view.active .back-btn');if(b){b.click();return 'ok';}}return 'exit';}"
                        + "document.getElementById('btn-pause').click();return 'ok';})()",
                new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String v) {
                        if (v != null && v.contains("exit")) finish();
                    }
                });
    }

    @Override
    protected void onPause() {
        super.onPause();
        web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
        hideSystemUi();
    }

    @Override
    protected void onDestroy() {
        web.destroy();
        super.onDestroy();
    }
}
