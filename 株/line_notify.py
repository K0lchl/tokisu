import requests
from config import LINE_NOTIFY_TOKEN

def send_line_notify(message):
    """
    LINE Notifyにメッセージを送信する
    """
    if LINE_NOTIFY_TOKEN == "ここにLINEトークンを貼り付けてください" or not LINE_NOTIFY_TOKEN:
        print(f"[LINE未設定 - Console出力] {message}")
        return False
        
    line_notify_api = 'https://notify-api.line.me/api/notify'
    headers = {'Authorization': f'Bearer {LINE_NOTIFY_TOKEN}'}
    data = {'message': f'\n{message}'} # メッセージの先頭を改行すると見やすい
    
    try:
        response = requests.post(line_notify_api, headers=headers, data=data)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        print(f"[LINE通知エラー]: {e}")
        return False

if __name__ == "__main__":
    # テスト送信
    send_line_notify("これはデイトレシステムからのテスト通知です。")
