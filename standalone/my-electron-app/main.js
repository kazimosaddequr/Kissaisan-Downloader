const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
    // win.loadURL('https://www.mp4upload.com/zzxtedbq0133')
  }

  app.whenReady().then(() => {
    createWindow()
  })