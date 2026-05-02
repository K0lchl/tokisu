import os

# LINE Messaging API トークンとユーザーID
# LINE Developersコンソールから取得してください
LINE_CHANNEL_ACCESS_TOKEN = os.environ.get("LINE_CHANNEL_ACCESS_TOKEN", "f4e/xaRD7qluFmezNB9TCEF24tlYUl078MErqNm8LP0DDo+/cFg6wzoyUM0Kr6X+YB0U5iTtYPpiq7TKG39dxIuAtH3z4rweH7dHl/hkAiM5BtrS7uERMk32HD6DXV9S6NrhlyIVoxQtmZOR4c7NxgdB04t89/1O/w1cDnyilFU=")
LINE_USER_ID = os.environ.get("LINE_USER_ID", "U10bdb9e370932fc5d3af53c7091ab2b7")

# 証券APIの設定（松井証券APIなどを利用する場合）
BROKER_API_KEY = os.environ.get("BROKER_API_KEY", "")
BROKER_API_SECRET = os.environ.get("BROKER_API_SECRET", "")
