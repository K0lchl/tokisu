import requests
from config import LINE_CHANNEL_ACCESS_TOKEN, LINE_USER_ID

def send_line_message(message):
    """
    LINE Messaging APIを使用して自身（LINE_USER_ID）にプッシュメッセージを送信する
    """
    if LINE_CHANNEL_ACCESS_TOKEN == "ここにチャンネルアクセストークンを貼り付けてください" or not LINE_CHANNEL_ACCESS_TOKEN:
        print(f"[LINE未設定 - Console出力] {message}")
        return False
        
    line_api_url = 'https://api.line.me/v2/bot/message/push'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {LINE_CHANNEL_ACCESS_TOKEN}'
    }
    
    # メッセージペイロードの構築
    data = {
        "to": LINE_USER_ID,
        "messages": [
            {
                "type": "text",
                "text": message
            }
        ]
    }
    
    try:
        response = requests.post(line_api_url, headers=headers, json=data)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        print(f"[LINE通知エラー]: {e}")
        if response is not None:
            print(f"レスポンス詳細: {response.text}")
        return False

if __name__ == "__main__":
    # テスト送信
    send_line_message("これはデイトレシステムからのテスト通知です。（Messaging API経由）")
