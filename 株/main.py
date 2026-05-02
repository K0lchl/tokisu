import schedule
import time
from datetime import datetime
from kabutan_scraper import fetch_kabutan_materials
from kabutan_ir_scraper import fetch_kabutan_disclose, filter_by_stock_price
import csv
import os
from line_bot_api import send_line_message

# 前回取得したIRのタイトルを保持して重複通知を防ぐ
seen_irs = set()

def log_ir_to_csv(ir):
    """取得したIRをCSVに記録する"""
    file_exists = os.path.isfile('ir_log.csv')
    with open('ir_log.csv', 'a', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(['日付', '時間', 'コード', '銘柄', 'カテゴリ', 'タイトル', '株価', '反省'])
        
        today_date = datetime.now().strftime('%Y/%m/%d')
        writer.writerow([today_date, ir['time'], ir['code'], ir['company'], ir.get('category', ''), ir['title'], ir.get('price', ''), ''])

def morning_routine():
    """8:50に実行: 株探の前日の好悪材料を取得してLINEに通知"""
    print(f"[{datetime.now()}] 朝の銘柄選定ルーティンを実行中...")
    result = fetch_kabutan_materials()
    if result:
        message = f"☀️【朝の銘柄選定: {result['title']}】\n\n今日のデイトレで注目すべき銘柄情報です。\n{result['summary']}\n\n詳細: {result['url']}"
        send_line_message(message)
    else:
        send_line_message("☀️【朝の銘柄選定】\n本日の株探「明日の好悪材料」記事が見つかりませんでした。")

def check_ir_and_volume():
    """ザラ場中（9:00~11:30, 12:30~15:30）に5分おきに実行"""
    now = datetime.now()
    
    # 5分おき（0分, 5分, 10分...）にのみ実行するように制限
    if now.minute % 5 != 0:
        return
    
    # 時間外はスキップ
    # 午前: 9:00〜11:30
    # 午後: 12:30〜15:30
    is_morning_session = (now.hour == 9) or (now.hour == 10) or (now.hour == 11 and now.minute <= 30)
    is_afternoon_session = (now.hour == 12 and now.minute >= 30) or (now.hour == 13) or (now.hour == 14) or (now.hour == 15 and now.minute <= 30)
    
    if not (is_morning_session or is_afternoon_session):
        return

    print(f"[{datetime.now()}] ザラ場監視ルーティンを実行中...")
    
    # 1. IR情報のチェック
    ir_list = fetch_kabutan_disclose()
    
    # 初回起動かどうか判定（起動直後に過去の大量のIRを通知しないため）
    is_first_run = len(seen_irs) == 0
    
    # 新しく見つけたIRだけを抽出
    new_irs = []
    for ir in ir_list:
        ir_key = f"{ir['code']}_{ir['title']}"
        if ir_key not in seen_irs:
            new_irs.append(ir)
            
    if not new_irs:
        return
        
    if is_first_run:
        # 初回起動時はすべて既読にしてスキップ（通知しない）
        for ir in new_irs:
            ir_key = f"{ir['code']}_{ir['title']}"
            seen_irs.add(ir_key)
        print(f"初回起動: {len(new_irs)}件の過去IRを既読としてスキップしました。これ以降に出た新規IRをスクリーニングして通知します。")
        return

    # 新規IRに対してのみ、株価を取得して700円以下にフィルタリング
    filtered_ir = filter_by_stock_price(new_irs, max_price=700)
    
    for ir in filtered_ir:
        # 新しいIRがあればLINE通知
        message = f"🚨【IR速報】\n銘柄: {ir['company']} ({ir['code']})\n株価: {ir['price']}円\n内容: {ir['title']}"
        send_line_message(message)
        # ついでにCSVにログ保存
        log_ir_to_csv(ir)

    # 今回チェックした新規IRは、株価に関わらず全て既読にする（次回以降株価を取得しないようにするため）
    for ir in new_irs:
        ir_key = f"{ir['code']}_{ir['title']}"
        seen_irs.add(ir_key)
            
    # 3. 出来高急増チェック (TODO: 松井証券APIとの連携が必要)
    # matsui.check_volume_surge(...)

def setup_schedule():
    """スケジュールの登録"""
    # 月曜〜金曜の8:50に朝の銘柄通知
    schedule.every().monday.at("08:50").do(morning_routine)
    schedule.every().tuesday.at("08:50").do(morning_routine)
    schedule.every().wednesday.at("08:50").do(morning_routine)
    schedule.every().thursday.at("08:50").do(morning_routine)
    schedule.every().friday.at("08:50").do(morning_routine)
    
    # ザラ場中は1分おきにIRと出来高をチェック
    schedule.every(1).minutes.do(check_ir_and_volume)
    
    print("スケジューラを起動しました。")
    print("朝の通知: 8:50")
    print("ザラ場監視: 9:00~11:30, 12:30~15:30 (5分間隔: 00, 05, 10分...)")

if __name__ == "__main__":
    # 起動時にテストで1回だけ実行（デバッグ用）
    # morning_routine()
    # check_ir_and_volume()
    
    setup_schedule()
    
    while True:
        schedule.run_pending()
        time.sleep(1)
