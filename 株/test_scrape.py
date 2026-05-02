import requests
from bs4 import BeautifulSoup

url = "https://www.nikkei.com/markets/kigyo/disclose/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'lxml')

# Try to find the disclosure table or list
print(f"Status Code: {response.status_code}")
title = soup.find('title')
print(f"Title: {title.text if title else 'No title'}")

# Nikkei usually puts these in some list/table. Let's print a small snippet of the body text to see if data is there
print(soup.body.text[:500].replace('\n', ' ').strip())
