const {
  app, BrowserWindow, ipcMain, screen,
  shell, Tray, Menu, nativeImage, globalShortcut
} = require('electron');
app.commandLine.appendSwitch('enable-transparent-visuals');
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');
const os   = require('os');

// ── Env-var expansion ─────────────────────────────────────────────────────────
function resolveEnv(p) {
  return String(p)
    .replace(/%APPDATA%/gi,             process.env.APPDATA      || '')
    .replace(/%LOCALAPPDATA%/gi,        process.env.LOCALAPPDATA || '')
    .replace(/%PROGRAMFILES%/gi,        process.env.PROGRAMFILES || 'C:\\Program Files')
    .replace(/%PROGRAMFILES\(X86\)%/gi, process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)')
    .replace(/%USERPROFILE%/gi,         process.env.USERPROFILE  || os.homedir())
    .replace(/%SYSTEMROOT%/gi,          process.env.SYSTEMROOT   || 'C:\\Windows');
}

function expandGlob(rawPath) {
  const resolved = resolveEnv(rawPath);
  if (!resolved.includes('*')) return [resolved];
  const dir = path.dirname(resolved);
  const pat = path.basename(resolved);
  try {
    const re = new RegExp('^' + pat.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*') + '$', 'i');
    return fs.readdirSync(dir).filter(e => re.test(e)).map(e => path.join(dir, e));
  } catch { return []; }
}

// ── Built-in app definitions ──────────────────────────────────────────────────
const APP_DEFS = {
  spotify:    { exePaths:['%APPDATA%\\Spotify\\Spotify.exe','%LOCALAPPDATA%\\Microsoft\\WindowsApps\\Spotify.exe'], website:'https://www.spotify.com/download/windows/' },
  youtube:    { alwaysWeb:true, website:'https://youtube.com' },
  netflix:    { exePaths:['%LOCALAPPDATA%\\Microsoft\\WindowsApps\\Netflix.exe'], website:'https://www.microsoft.com/store/apps/9wzdncrfj3tj' },
  discord:    { exePaths:['%LOCALAPPDATA%\\Discord\\app-*\\Discord.exe'], globExe:true, website:'https://discord.com/download' },
  telegram:   { exePaths:['%APPDATA%\\Telegram Desktop\\Telegram.exe','%LOCALAPPDATA%\\Telegram Desktop\\Telegram.exe'], website:'https://desktop.telegram.org/' },
  vk:         { exePaths:['%LOCALAPPDATA%\\Programs\\VK\\VK.exe'], website:'https://vk.com/app' },
  twitch:     { exePaths:['%APPDATA%\\Twitch\\Bin\\Twitch.exe'], website:'https://www.twitch.tv/downloads' },
  applemusic: { exePaths:['%LOCALAPPDATA%\\Microsoft\\WindowsApps\\AppleInc.AppleMusic_nzyj5cx40ttqa\\Music.exe'], website:'https://www.microsoft.com/store/apps/9PFHDD62MXS1' },
  soundcloud: { alwaysWeb:true, website:'https://soundcloud.com' },
  steam:      { exePaths:['C:\\Program Files (x86)\\Steam\\steam.exe','C:\\Program Files\\Steam\\steam.exe'], website:'https://store.steampowered.com/about/' },
  epic:       { exePaths:['%LOCALAPPDATA%\\EpicGamesLauncher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe','C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe'], website:'https://store.epicgames.com/download' },
  gog:        { exePaths:['C:\\Program Files (x86)\\GOG Galaxy\\GalaxyClient.exe'], website:'https://www.gog.com/galaxy' },
  battlenet:  { exePaths:['C:\\Program Files (x86)\\Battle.net\\Battle.net Launcher.exe'], website:'https://www.blizzard.com/download/' },
  minecraft:  { exePaths:['C:\\Program Files (x86)\\Minecraft Launcher\\MinecraftLauncher.exe','C:\\XboxGames\\Minecraft Launcher\\Content\\Minecraft.exe'], website:'https://www.minecraft.net/download' },
  roblox:     { exePaths:['%LOCALAPPDATA%\\Roblox\\Versions\\RobloxPlayerLauncher.exe'], globExe:true, website:'https://www.roblox.com/download' },
  ubisoft:    { exePaths:['C:\\Program Files (x86)\\Ubisoft\\Ubisoft Game Launcher\\UbisoftConnect.exe'], website:'https://www.ubisoft.com/en-us/ubisoft-connect' },
  ea:         { exePaths:['C:\\Program Files\\Electronic Arts\\EA Desktop\\EA Desktop\\EADesktop.exe'], website:'https://www.ea.com/ea-app' },
  xbox:       { protocol:'ms-xbox://', exePaths:['%LOCALAPPDATA%\\Microsoft\\WindowsApps\\GamingApp.exe'], website:'https://www.xbox.com/en-US/apps/xbox-app-for-pc' },
  vscode:     { exePaths:['%LOCALAPPDATA%\\Programs\\Microsoft VS Code\\Code.exe','C:\\Program Files\\Microsoft VS Code\\Code.exe'], website:'https://code.visualstudio.com/download' },
  terminal:   { exePaths:['%LOCALAPPDATA%\\Microsoft\\WindowsApps\\wt.exe','%SYSTEMROOT%\\System32\\cmd.exe'], website:'https://aka.ms/terminal' },
  github:     { exePaths:['%LOCALAPPDATA%\\GitHubDesktop\\GitHubDesktop.exe'], website:'https://desktop.github.com/' },
  figma:      { exePaths:['%LOCALAPPDATA%\\Figma\\Figma.exe'], website:'https://www.figma.com/downloads/' },
  postman:    { exePaths:['%LOCALAPPDATA%\\Postman\\Postman.exe'], website:'https://www.postman.com/downloads/' },
  dbeaver:    { exePaths:['C:\\Program Files\\DBeaver\\dbeaver.exe'], website:'https://dbeaver.io/download/' },
  cursor:     { exePaths:['%LOCALAPPDATA%\\Programs\\cursor\\Cursor.exe'], website:'https://cursor.sh/' },
  notion:     { exePaths:['%LOCALAPPDATA%\\Programs\\Notion\\Notion.exe'], website:'https://www.notion.so/desktop' },
  obsidian:   { exePaths:['%LOCALAPPDATA%\\Programs\\obsidian\\Obsidian.exe'], website:'https://obsidian.md/download' },
};

function findExe(def) {
  for (const raw of (def.exePaths || [])) {
    const candidates = def.globExe ? expandGlob(raw) : [resolveEnv(raw)];
    for (const p of candidates) {
      try { if (p && fs.existsSync(p)) return p; } catch {}
    }
  }
  return null;
}

// ── IPC handlers ──────────────────────────────────────────────────────────────

ipcMain.handle('launch-app', async (_, key) => {
  const def = APP_DEFS[key];
  if (!def) return { ok:false, msg:'Unknown app: ' + key };
  if (def.alwaysWeb) { shell.openExternal(def.website); return { ok:true, web:true }; }
  const exe = findExe(def);
  if (exe) {
    try { spawn(exe, [], { detached:true, stdio:'ignore' }).unref(); return { ok:true }; }
    catch (e) { return { ok:false, msg:e.message }; }
  }
  if (def.protocol) {
    try { shell.openExternal(def.protocol); return { ok:true }; } catch {}
  }
  shell.openExternal(def.website);
  return { ok:true, web:true };
});

ipcMain.handle('launch-exe', async (_, exePath) => {
  try {
    const resolved = resolveEnv(String(exePath || '').trim());
    if (!resolved) return { ok:false, msg:'Пустой путь' };
    if (!fs.existsSync(resolved)) return { ok:false, msg:'Файл не найден' };
    spawn(resolved, [], { detached:true, stdio:'ignore', cwd:path.dirname(resolved) }).unref();
    return { ok:true };
  } catch (e) { return { ok:false, msg:e.message }; }
});

ipcMain.handle('open-url', async (_, url) => {
  try { await shell.openExternal(String(url || '')); return { ok:true }; }
  catch (e) { return { ok:false, msg:e.message }; }
});

ipcMain.handle('check-installed', async () => {
  const r = {};
  for (const [k, d] of Object.entries(APP_DEFS)) {
    r[k] = d.alwaysWeb ? 'web' : (findExe(d) ? 'installed' : 'web');
  }
  return r;
});

ipcMain.on('hide-window', () => { if (visible) hidePanel(); });

ipcMain.handle('get-autostart', () => {
  try {
    const out = execSync('reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v QuickLaunch 2>nul').toString();
    return out.includes('QuickLaunch');
  } catch { return false; }
});

ipcMain.handle('set-autostart', (_, enable) => {
  try {
    const key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
    if (enable) execSync(`reg add "${key}" /v "QuickLaunch" /t REG_SZ /d "${process.execPath}" /f`);
    else        execSync(`reg delete "${key}" /v "QuickLaunch" /f 2>nul`);
    return true;
  } catch { return false; }
});

// ── Windows app search ────────────────────────────────────────────────────────
const START_MENU_DIRS = [
  path.join(os.homedir(), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs'),
  'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs',
];
const BLOCKLIST_RE = /^(unin|setup|install|update|repair|crash|helper|redist|vcredist|dotnet|cleanup|stub|elevat)/i;

function walkLnk(dir, results, depth) {
  if (depth > 4) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes:true }); } catch { return; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkLnk(full, results, depth + 1);
    else if (e.isFile() && e.name.toLowerCase().endsWith('.lnk')) results.push(full);
  }
}

let winAppCache = null;
let cacheReady  = false;

function buildCache() {
  if (cacheReady) return;
  cacheReady = true;
  const apps = [];
  for (const dir of START_MENU_DIRS) {
    const found = [];
    walkLnk(dir, found, 0);
    for (const lnk of found) {
      const name = path.basename(lnk, '.lnk');
      if (!BLOCKLIST_RE.test(name.replace(/[\s_\-.]/g, ''))) {
        apps.push({ name, path:lnk });
      }
    }
  }
  winAppCache = apps;
}

const LAUNCHER_NAMES = {
  spotify:'Spotify', youtube:'YouTube', netflix:'Netflix', discord:'Discord',
  telegram:'Telegram', vk:'VK', twitch:'Twitch', applemusic:'Apple Music', soundcloud:'SoundCloud',
  steam:'Steam', epic:'Epic Games', gog:'GOG Galaxy', battlenet:'Battle.net',
  minecraft:'Minecraft', roblox:'Roblox', ubisoft:'Ubisoft', ea:'EA App', xbox:'Xbox',
  vscode:'VS Code', terminal:'Terminal', github:'GitHub', figma:'Figma',
  postman:'Postman', dbeaver:'DBeaver', cursor:'Cursor', notion:'Notion', obsidian:'Obsidian',
};
const LAUNCHER_EMOJIS = {
  spotify:'🎵', youtube:'▶️', netflix:'🎬', discord:'💬', telegram:'✈️', vk:'🌐',
  twitch:'📺', applemusic:'🎼', soundcloud:'☁️', steam:'🎮', epic:'⚡', gog:'🌌',
  battlenet:'🔵', minecraft:'⛏️', roblox:'🧱', ubisoft:'🎯', ea:'🏆', xbox:'🎲',
  vscode:'💙', terminal:'⬛', github:'🐙', figma:'🎨', postman:'🚀', dbeaver:'🐦',
  cursor:'✏️', notion:'📝', obsidian:'💎',
};
const LAUNCHER_LIST = Object.keys(APP_DEFS).map(key => ({
  key, n: LAUNCHER_NAMES[key] || key, e: LAUNCHER_EMOJIS[key] || '🖥️',
}));

ipcMain.handle('search-apps', async (_, query) => {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  if (!cacheReady) buildCache();
  const results = [];
  for (const a of LAUNCHER_LIST) {
    if (a.n.toLowerCase().includes(q) || a.key.includes(q)) {
      const def = APP_DEFS[a.key];
      results.push({ ...a, installed: def && !def.alwaysWeb && !!findExe(def), isLauncher:true });
    }
  }
  if (winAppCache) {
    const launcherNames = new Set(LAUNCHER_LIST.map(a => a.n.toLowerCase()));
    const winMatches = winAppCache
      .filter(a => a.name.toLowerCase().includes(q) && !launcherNames.has(a.name.toLowerCase()))
      .slice(0, 30);
    for (const a of winMatches) {
      results.push({ n:a.name, e:'🖥️', installed:true, isLauncher:false, winPath:a.path, winType:'lnk' });
    }
  }
  return results.slice(0, 48);
});

ipcMain.handle('launch-win-app', async (_, winPath, winType) => {
  try {
    if (winType === 'lnk') {
      const res = await shell.openPath(winPath);
      return { ok: res === '' };
    }
    spawn(winPath, [], { detached:true, stdio:'ignore' }).unref();
    return { ok:true };
  } catch (e) { return { ok:false, msg:e.message }; }
});

setTimeout(() => { try { buildCache(); } catch {} }, 2000);

// ── Window management ─────────────────────────────────────────────────────────
let win, tray;
let visible     = false;
let pageReady   = false;
let showOnReady = false;

const PW = 860, PH = 620;

function getPos() {
  const d  = screen.getPrimaryDisplay();
  const tb = d.bounds.height - d.workArea.height;
  return {
    x: Math.round(d.bounds.width / 2 - PW / 2),
    y: d.bounds.height - tb - PH - 12,
  };
}

function createWindow() {
  const { x, y } = getPos();
  win = new BrowserWindow({
    width:PW, height:PH, x, y,
    frame:false, transparent:true,
    resizable:false, movable:false,
    skipTaskbar:true, alwaysOnTop:true, show:false,
    webPreferences:{
      preload:              path.join(__dirname, 'preload.js'),
      contextIsolation:     true,
      nodeIntegration:      false,
      backgroundThrottling: false,
    },
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));

  win.webContents.on('did-finish-load', () => {
    pageReady = true;
    if (showOnReady) { showOnReady = false; _doShow(); }
  });

  // Uncomment to debug renderer:
  // win.webContents.openDevTools({ mode: 'detach' });

  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen:true });
  win.on('blur', () => { if (visible) hidePanel(); });
}

function _doShow() {
  const { x, y } = getPos();
  win.setBounds({ x, y, width:PW, height:PH });
  win.show();
  win.focus();
  win.webContents.send('panel-show');
  visible = true;
}

function showPanel() {
  if (!win || win.isDestroyed()) return;
  if (!pageReady) { showOnReady = true; return; }
  _doShow();
}

function hidePanel() {
  visible = false;
  if (win && !win.isDestroyed()) {
    win.webContents.send('panel-hide');
    setTimeout(() => { if (!visible && win && !win.isDestroyed()) win.hide(); }, 260);
  }
}

function togglePanel() { visible ? hidePanel() : showPanel(); }

function createTray() {
  // Valid 16x16 orange PNG (RGB #c85a00), base64-encoded
  const iconB64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAF0lEQVR4nGM4EcVAEiJN9aiGUQ1DSgMA9RQiEODQvSMAAAAASUVORK5CYII=';
  const icon = nativeImage.createFromDataURL('data:image/png;base64,' + iconB64);
  tray = new Tray(icon);
  tray.setToolTip('QuickLaunch  ·  Win+Q');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label:'🟠  QuickLaunch', enabled:false },
    { type:'separator' },
    { label:'Показать / Скрыть   Win+Q', click:togglePanel },
    { type:'separator' },
    { label:'Выход', click:() => { globalShortcut.unregisterAll(); app.exit(0); } },
  ]));
  tray.on('click', togglePanel);
  tray.on('double-click', togglePanel);
}

// ── App lifecycle ─────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  createTray();
  const ok = globalShortcut.register('Super+Q', togglePanel);
  if (!ok) globalShortcut.register('Alt+Space', togglePanel);
  setTimeout(() => showPanel(), 800);
});

app.on('will-quit',         () => globalShortcut.unregisterAll());
app.on('window-all-closed', e  => e.preventDefault());
