// const request = require('request-promise');
const cheerio  = require('cheerio');
const { request } = require('urllib');
const fs = require('fs');


const URL = 'https://kissasian.lu/Drama/Heaven';
// const URL = 'https://kissasian.lu/Drama/Heaven/Episode-1?id=48342'
// const URL = 'https://kissasian.lu/Mobile/SwitchToMobile/Drama/Heaven';

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'max-age=0',
    'Referer': 'https://kissasian.lu/Search/Drama',
    "Sec-Ch-Ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': "Windows",
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    
    
};

option = {
    headers : header,
    dataType: 'html',
    gzip : true
};


(async () => {
    // const reply = await request(URL,option);
    // const { data, res } = await request(URL,option);
    // result: { data: Buffer, res: Response }
    // console.log('status: %s, body size: %d, headers: %j', res.status, data.length, res.headers);
    // console.log('\n%s\n',data);
    // console.log(res);
    // console.log(reply.data)
    // fs.writeFileSync("./data/out.html",reply.data,'utf-8');
    // debugger;
    // console.log('hello');
    
    // const response = await request(URL);
    // console.log(response); 
    // let $ = cheerio.load(response);

    // // let title = $('td[class  = "episodeSub"] > a').text();
    // let title = $('head > title').text().trim();
    // let episodes = $('table[class = "listing"]>tbody td[class = "episodeSub"] a').text()

    // console.log(title);
    // console.log(episodes);


    // COmbined
    // 
    const reply = await request(URL,option);
    // console.log(reply.data);
    let $ = cheerio.load(reply.data);
    // let title = $('td[class  = "episodeSub"] > a').text();
    let title = $('head > title').text().trim();
    
    console.log(title);

    let episode_each = [];
    let episodes = $('table[class = "listing"]>tbody td[class = "episodeSub"] a').text().trim()
    let episode1 = $("#leftside > div:nth-child(3) > div.barContent.episodeList > div:nth-child(2) > table > tbody > tr:nth-child(3) > td.episodeSub > a").attr('href')
    let episodes_all = $('table[class = "listing"]>tbody td[class = "episodeSub"] a').each((i,elm) => {
        let sode = $(elm).attr("href");

        episode_each.push(sode);
    });
    // console.log(episodes);
    // console.log(episode1);
    // console.log(episodes_all);
    console.log(episode_each);

    debugger;


})()


