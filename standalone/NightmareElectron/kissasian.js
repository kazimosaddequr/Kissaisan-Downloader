const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
}

// x = 'hello';
let episodeTitle = [];
let urlEpisodeList = [];

nightmare
  .goto('https://kissasian.lu/Mobile/SwitchToMobile')
  .wait()
  .goto('https://kissasian.lu/Drama/Heaven')
  .wait()
  // .evaluate(() => document.querySelector('h3'))
  .evaluate (function () {
    return document.querySelector('div[class = "heading"]').innerText;

    // return  document.querySelector('div[class = "heading"]').innerText;
  }
  )
  .evaluate(function () {
    // let name = document.querySelector('li[class = "episodeSub"]');
    var lsit = document.querySelectorAll('li[class = "episodeSub"]');
    var array = [...lsit];
    // array.forEach(li=>{
      
    // })
    return array;
    })

  // /html/body/div[1]/div[2]/div/div[5]/div[1]/div/h3
  //  /html/body/div[1]/div[2]/div/div[8]/div[2]/ul/li[1]/a
  // .exists('/html/body/div[1]/div[2]/div/div[5]/div[1]/div/h3')
  // .evaluate('/html/body/div[1]/div[2]/div/div[5]/div[1]/div/h3')
  // .evaluate()
  // .goto('https://kissasian.lu/Drama/Heaven/Drama/Heaven/Episode-1?id=48342&s=mp',header)
//   .type('#search_form_input_homepage', 'github nightmare')
//   .click('#search_button_homepage')
//   .wait('#r1-0 a.result__a')
//   .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
  
  .end()
  .then(function (result){
    console.log('value of x is :: ');
    // console.log(episodeTitle);
    console.log(result);
  } )

  .catch(error => {
    console.error('Search failed:', error)
  })

  // console.log(x);
  // console.log(x);

  // win.loadURL('https://kissasian.lu/Mobile/SwitchToMobile')
    // window.setTimeout
    // win.loadURL('https://kissasian.lu/Drama/Heaven/Drama/Heaven/Episode-1?id=48342&s=mp')