from pyppeteer import launch
from bs4 import BeautifulSoup

# headers = {
#     'user-agent' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
# }
# urlDomain = 'https://kissasian.lu'


async def linkGrab(url,urlDomain,headers):
    browser = await launch()
    page = await browser.newPage()
    await page.setExtraHTTPHeaders(headers)
    await page.goto(urlDomain+url+'&s=mp')
    # await page.screenshot({'path': 'example.png'})
    # content = await page.evaluate('document.body', force_expr=True)
    # content = await page.evaluate('document.querySelector("body > div.shifter-page > div.main > div > div:nth-child(7) > div.section.group.video-container > a")', force_expr=True)
    content = await page.content()
    s = BeautifulSoup(content,'lxml')
    temp_x_find_a = s.find_all('a')
    # mp4UploadLink.append(temp_x_find_a[12].get('href'))
    # content = await page.evaluate( 'document.body.querySelector( "a" )', force_expr=True)
    await browser.close()
    # file1 = open("MyFile.html", "w") 
    # file1.writelines(temp_x_find_a[12].get('href'))
    mp4UploadLink = temp_x_find_a[12].get('href')
    # print(temp_x_find_a[12].get('href'))
    return mp4UploadLink
    # file1.close() 
    # print(list)
    # print('mischief managed')

