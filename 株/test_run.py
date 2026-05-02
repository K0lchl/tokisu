from main import morning_routine, check_ir_and_volume

if __name__ == "__main__":
    print("=== 朝の銘柄選定テスト ===")
    morning_routine()
    
    print("\n=== IR速報テスト ===")
    from kabutan_ir_scraper import fetch_kabutan_disclose
    from line_bot_api import send_line_message
    ir_list = fetch_kabutan_disclose()
    if ir_list:
        ir = ir_list[0]
        message = f"🚨【IR速報テスト】\n銘柄: {ir['company']} ({ir['code']})\n内容: {ir['title']}"
        send_line_message(message)
    else:
        print("本日のIRはありませんでした。")
    
    print("テスト完了。LINEを確認してください。")
