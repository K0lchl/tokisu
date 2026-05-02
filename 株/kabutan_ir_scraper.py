import requests
from bs4 import BeautifulSoup
from datetime import datetime

def fetch_kabutan_disclose():
    """
    株探の適時開示（IR）ページをスクレイピングして最新のIRを取得する。
    URL: https://kabutan.jp/disclosures/
    """
    url = "https://kabutan.jp/disclosures/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.encoding = response.apparent_encoding # 文字化け対策
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'lxml')
        ir_list = []
        
        table = soup.find('table', {'class': 'stock_table'})
        if not table:
            print("[Kabutan Scraper] 適時開示のテーブルが見つかりませんでした。")
            return []
            
        rows = table.find_all('tr')
        # 最初はヘッダー行なのでスキップ (1行目から取得)
        for row in rows[1:]:
            cols = row.find_all('td')
            if len(cols) >= 5:
                code = cols[0].text.strip()
                company_name = cols[1].text.strip()
                category = cols[2].text.strip()
                title = cols[3].text.strip()
                time_str = cols[4].text.strip().replace('\xa0', ' ')
                
                ir_list.append({
                    'time': time_str,
                    'code': code,
                    'company': company_name,
                    'category': category,
                    'title': title
                })
        return ir_list
    except Exception as e:
        print(f"[Kabutan Scraper Error]: {e}")
        return []

def get_stock_price(code):
    """
    株探の個別銘柄ページから現在の株価を取得する
    """
    url = f"https://kabutan.jp/stock/?code={code}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers)
        response.encoding = response.apparent_encoding
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'lxml')
        # 株価は <span class="vlight-val"> 等ではなく、<dl class="stock_detail"> の中の値などに入っていることが多い
        # 簡単な方法として、"円"という文字を含むspanを探すか、特定のID/クラスを探す
        # ここでは一番確実なID (stockinfo_i1) やクラス (kobetsu_data_table) を探す
        price_td = soup.find('td', {'id': 'stockinfo_i1'})
        if price_td:
            price_str = price_td.text.replace(',', '').replace('円', '').strip()
            return float(price_str)
        return None
    except Exception as e:
        print(f"[Stock Price Error] {code}: {e}")
        return None

def filter_by_stock_price(ir_list, max_price=700):
    """
    株価が指定の価格以下の銘柄のみに絞り込む。
    """
    import time
    filtered = []
    for ir in ir_list:
        current_price = get_stock_price(ir['code'])
        
        if current_price is not None and current_price <= max_price:
            ir['price'] = current_price
            filtered.append(ir)
            
        # 株探サーバーへの負荷軽減（アクセス拒否を避けるため）
        time.sleep(0.5)
            
    return filtered

if __name__ == "__main__":
    results = fetch_kabutan_disclose()
    print(f"取得したIR件数: {len(results)}")
    if results:
        print(results[0])
