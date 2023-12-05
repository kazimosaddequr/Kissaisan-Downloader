import requests
from bs4 import BeautifulSoup
import asyncio
import json
import threading
from tqdm import tqdm
import os
import time

from modules.linkGrab import linkGrab
from modules.downapp import downloadLink

print('please input the link:')
# urlSeries = 'https://kissasian.lu/Drama/Heaven'
urlSeries = input()

seriesName = urlSeries.replace('https://kissasian.lu/Drama/','')
seriesName = seriesName.replace('-',' ')
seriesNameJSON = seriesName+".json"
path_to_Data = os.path.join(os.getcwd(),'data')
path_to_Json = os.path.join(os.getcwd(),'data',seriesNameJSON)
json_exist_flag = False


episodeMark = []
linkTitles = []
mp4UploadLink = []
mp4Upload = ""
headers = {
    'user-agent' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
}
urlDomain = 'https://kissasian.lu'


if(os.path.exists(path_to_Json)):
    with open(path_to_Json, 'r') as openfile:
        json_object = json.load(openfile)
    number_of_episodes = json_object['number of episode']
    for i in range(number_of_episodes):
        # print("\n"+json_object['episodeMark'][i]+"\n"+json_object['linkTitles'][i]+"\n"+json_object['mp4UploadLink'][i]+"\n")
        episodeMark.append(json_object['episodeMark'][i])
        linkTitles.append(json_object['linkTitles'][i])
        mp4UploadLink.append(json_object['mp4UploadLink'][i])
    json_exist_flag = True
    



if not(json_exist_flag):
    page = requests.get(urlSeries,headers=headers)
    s = BeautifulSoup(page.text,'lxml')
    titles = s.find_all('li', attrs={'class':'episodeSub'})
    linkTitles = [title.a.get('href') for title in titles]
    linkTitles.reverse()
    # msg ="hello world"
    # print(msg)
    print('collecting mp4 link for '+seriesName)

    number_of_episodes = len(linkTitles)

    # print(linkTitles)
    progress_bar = tqdm(total= number_of_episodes, desc='Collecting Links:',unit='links')
    for link in linkTitles:
        mp4Upload = asyncio.get_event_loop().run_until_complete(linkGrab(link,urlDomain,headers))
        mp4UploadLink.append(mp4Upload)
        progress_bar.update(1)
    progress_bar.close()
    # print(mp4UploadLink)
    # file1 = open("MyFile.html", "w") 
    # file1.writelines(linkTitles)
    # file1.writelines(mp4UploadLink)
    # file1.close() 

    n = 1
    for i in linkTitles:
        if len(str(n))==1:
            temp_str = seriesName+' ep 00'+str(n)+'.mp4'        
        elif len(str(n))==2:
            temp_str = seriesName+' ep 0'+str(n)+'.mp4'
        else:
            temp_str = seriesName+' ep '+str(n)+'.mp4'
        episodeMark.append(temp_str)
        n = n + 1

    # print(episodeMark)

    dictionary = {
        'url of series':urlSeries,
        'series name': seriesName,
        'number of episode': len(linkTitles),
        'episodeMark' : episodeMark,
        'linkTitles':linkTitles,
        'mp4UploadLink':mp4UploadLink
    }

    if not(os.path.exists(path_to_Data)):
        os.makedirs(path_to_Data)

    with open(path_to_Json, "w") as outfile:
        json.dump(dictionary, outfile)

thread_one = threading.Thread()
thread_two = threading.Thread()
episode_number = number_of_episodes
flagFinish = False
m = 0
while not(flagFinish):
    if(not(thread_one.is_alive())):
        thread_one = threading.Thread(target=downloadLink,args=(mp4UploadLink[m],seriesName,episodeMark[m]))
        thread_one.start()
        m = m + 1
        if m == episode_number:
            flagFinish = True
    elif(not(thread_two.is_alive())):
        thread_two = threading.Thread(target=downloadLink,args=(mp4UploadLink[m],seriesName,episodeMark[m]))
        thread_two.start()
        m = m + 1
        if m == episode_number:
            flagFinish = True
    else:
        time.sleep(1)
    