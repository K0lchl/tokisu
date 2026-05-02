import requests
from bs4 import BeautifulSoup
import re

def fetch_kabutan_materials():
    """
    株探の「明日の好悪材料を開示情報でチェック！」記事を取得する。
    URL: https://kabutan.jp/news/marketnews/
    """
    base_url = "https://kabutan.jp"
    news_url = "https://kabutan.jp/news/marketnews/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(news_url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'lxml')
        
        # 「明日の好悪材料」を含むリンクを探す
        target_link = None
        for a_tag in soup.find_all('a'):
            if a_tag.text and "明日の好悪材料" in a_tag.text:
                target_link = a_tag['href']
                if not target_link.startswith('http'):
                    target_link = base_url + target_link
                break
                
        if not target_link:
            print("[Kabutan] 今日の「明日の好悪材料」記事が見つかりませんでした。")
            return None
            
        # 記事詳細ページを取得
        article_response = requests.get(target_link, headers=headers)
        article_response.raise_for_status()
        article_response.encoding = article_response.apparent_encoding # 文字化け対策
        article_soup = BeautifulSoup(article_response.content, 'lxml')
        
        # 本文を取得（pタグのテキストを結合）
        paragraphs = article_soup.find_all('p')
        text = "\n".join([p.text.strip() for p in paragraphs if len(p.text.strip()) > 10])
        
        if not text:
            text = article_soup.text # フォールバック
        # 簡単なクリーニング
        text = re.sub(r'\n+', '\n', text).strip()
        
        # 文字数制限（LINEの仕様等を考慮して一部を抜粋）
        if len(text) > 800:
            text = text[:800] + "\n... (続きは株探サイトで)"
            
        return {
            'title': "明日の好悪材料を開示情報でチェック！",
            'url': target_link,
            'summary': text
        }
        
    except Exception as e:
        print(f"[Kabutan Error]: {e}")
        return None

if __name__ == "__main__":
    result = fetch_kabutan_materials()
    if result:
        print(f"URL: {result['url']}")
        print(result['summary'][:200])
