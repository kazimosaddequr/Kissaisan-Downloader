const cheerio  = require('cheerio');
const { request } = require('urllib');
const fs = require('fs');

// const URL1 = 'https://kissasian.lu/Drama/Heaven/Drama/Heaven/Episode-1?id=48342&s=mp';
const URL2 = 'https://kissasian.lu';
const URLmobile = 'https://kissasian.lu/Mobile/SwitchToMobile';
const URL = URLmobile;
const titleRemover = ' English Sub | KissAsian';


// header = {
//     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.9',
//     'Cache-Control': 'max-age=0',
//     // 'Referer': 'https://kissasian.lu/Search/Drama',
//     "Sec-Ch-Ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//     'Sec-Ch-Ua-Mobile': '?0',
//     'Sec-Ch-Ua-Platform': "Windows",
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Sec-Fetch-Site': 'same-origin',
//     'Sec-Fetch-User': '?1',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    
    
// };

option = {
    // headers : header,
    dataType: 'html',
    gzip : true,
    followRedirect : true
};

(async () => {

    // let seriesData = [];
    
    // const reply = await request(URL,option);
    const {data, res} = await request(URL,option);
    // let reply = await request(URL);

    // x = res;


    reply = await request(URL2);
    
    fs.writeFileSync("./dummyCookie.html",reply.data);

    // console.log(data);

    


    console.log(res.headers);
    // console.log(x);

    // console.log(reply.data);
    // let $ = cheerio.load(reply.data);
    
    // let title = $('head > title').text().trim();
    
    // // console.log(title);
    // title = title.replace(titleRemover,"");

    // let episode_each = [];
    // let episode_name_each = [];
    // let episodes_all = $('table[class = "listing"]>tbody td[class = "episodeSub"] a').each((i,elm) => {
    //     let sode = $(elm).attr("href");
    //     let name = $(elm).text().trim();

    //     episode_each.push(sode);
    //     episode_name_each.push(name);
    // });
    
    // episode_each.reverse();
    // episode_name_each.reverse();
    // // console.log(episode_each);

    // seriesData.push({
    //     title,
    //     episode_name_each,
    //     episode_each
    // })

    
    //console.log(title.split("|")[0].pop().trim());
    // console.log(title.slice(-1));
    // console.log(seriesData);
    // fs.writeFileSync('./data1.json',JSON.stringify(seriesData),'utf-8');

    // console.log(seriesData.episode_each);
    debugger;


})()


