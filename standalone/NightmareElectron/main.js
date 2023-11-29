const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
    // win.loadURL('https://kissasian.lu/Mobile/SwitchToMobile')
    // window.setTimeout
    // win.loadURL('https://kissasian.lu/Drama/Heaven/Drama/Heaven/Episode-1?id=48342&s=mp')
  }

  app.whenReady().then(() => {
    createWindow()
    console.log('Hello')
    // (async () => {
    //     // await win.loadURL('https://kissasian.lu/Mobile/SwitchToMobile');
    //     // await win.loadURL('https://kissasian.lu/Drama/Heaven/Drama/Heaven/Episode-1?id=48342&s=mp')
    //     // const url = 'https://www.mp4upload.com/zzxtedbq0133';
    //     // const scrap = await new MP4UploadScraper().scrap(url);
    //     // console.log(scrap.success);
    //     // if (scrap.success)
    //         // console.log(scrap.data.sources);
    // })();
    
  })


  

