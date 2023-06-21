const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainFrameWindows;

function createWindow () {
  mainFrameWindows = new BrowserWindow
  ({
    width: 1280,
    height: 720,
    title: "Base Launcher Minecraft",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      preload: path.join(__dirname, 'src/renderer.js')
    },
  roundedCorners: false,
  frame: false,
  })

  mainFrameWindows.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (mainFrameWindows.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('close-window', () => {
    app.quit();
});
  
ipcMain.on('minimize-window', () => {
    mainFrameWindows.minimize();
});
  
ipcMain.on('maximize-window', () => {
    if (mainFrameWindows.isMaximized()) {
      mainFrameWindows.unmaximize();
    } else {
      mainFrameWindows.maximize();
    }
});