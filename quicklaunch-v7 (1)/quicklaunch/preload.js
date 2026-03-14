const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ql', {
  launch:         (key)      => ipcRenderer.invoke('launch-app',     key),
  launchExe:      (exePath)  => ipcRenderer.invoke('launch-exe',     exePath),
  openUrl:        (url)      => ipcRenderer.invoke('open-url',       url),
  checkInstalled: ()         => ipcRenderer.invoke('check-installed'),
  hide:           ()         => ipcRenderer.send('hide-window'),
  getAutostart:   ()         => ipcRenderer.invoke('get-autostart'),
  setAutostart:   (v)        => ipcRenderer.invoke('set-autostart',  v),
  searchApps:     (q)        => ipcRenderer.invoke('search-apps',    q),
  launchWinApp:   (p, t)     => ipcRenderer.invoke('launch-win-app', p, t),
  onShow:         (cb)       => ipcRenderer.on('panel-show', () => cb()),
  onHide:         (cb)       => ipcRenderer.on('panel-hide', () => cb()),
});
