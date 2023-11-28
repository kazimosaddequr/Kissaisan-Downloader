const { app, BrowserWindow } = require('electron')
const { MP4UploadScraper } = require('mp4upload-scraper');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    // win.loadFile('index.html')
    win.loadURL('https://kissasian.lu/Drama/Heaven')
  }

  app.whenReady().then(() => {
    createWindow()
    console.log('Hello')
    (async () => {
        const url = 'https://www.mp4upload.com/zzxtedbq0133';
        const scrap = await new MP4UploadScraper().scrap(url);
        console.log(scrap.success);
        // if (scrap.success)
            // console.log(scrap.data.sources);
    })();
    
  })


  

