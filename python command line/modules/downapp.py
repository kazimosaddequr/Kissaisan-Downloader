import PyBypass as bypasser
import requests
from tqdm import tqdm
import os
from urllib3.exceptions import InsecureRequestWarning
import json
import threading
import time

def downloadLink(url,series_name,episode_name):
    flag = False
    bypassed_link = bypasser.bypass(url,name="mp4upload")
    temp_str = episode_name
    # print(bypassed_link)

    # r=requests.get('https://www.mp4upload.com/')
    s= requests.Session()
    requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)
    response = s.get(bypassed_link['bypassed_url'],headers=bypassed_link['headers '],verify=False,stream=True)
    total_size_in_bytes= int(response.headers.get('content-length', 0))
    block_size = 1024 #1 Kibibyte

    path_output_folder = os.path.join(os.getcwd(),'out',series_name)
    path_output_series_file = os.path.join(path_output_folder,temp_str)

    if not(os.path.exists(path_output_folder)):
         os.makedirs(path_output_folder)

    if(os.path.exists(path_output_series_file)):
        local_size = os.path.getsize(path_output_series_file)
        if(local_size == total_size_in_bytes):
            print(temp_str+" already downloaded")
            flag = True
        else:
             print('size mismatch downloading again...')


    # print(total_size_in_bytes)
    if not(flag):
        progress_bar = tqdm( desc=temp_str,total=total_size_in_bytes, unit='iB', unit_scale=True)
        with open(path_output_series_file, 'wb') as file:
            for data in response.iter_content(block_size):
                progress_bar.update(len(data))
                file.write(data)
        progress_bar.close()
        if total_size_in_bytes != 0 and progress_bar.n != total_size_in_bytes:
                    print("ERROR, something went wrong")
                    if (os.path.exists(path_output_series_file)):
                        os.remove(path_output_series_file)