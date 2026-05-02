from flask import Flask, render_template_string, request, redirect, url_for
import csv
import os

app = Flask(__name__)
CSV_FILE = 'ir_log.csv'

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>デイトレ ワンクリック反省ダッシュボード</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #121212; color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .card { background-color: #1e1e1e; border: none; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
        .card-header { background-color: #2d2d2d; border-bottom: 1px solid #444; font-weight: bold; border-radius: 12px 12px 0 0 !important; }
        .btn-tag { margin: 2px; border-radius: 20px; font-size: 0.85rem; padding: 4px 12px; }
        .badge-price { background-color: #ff9800; color: #000; }
        .badge-time { background-color: #03a9f4; color: #000; }
        .reflection-text { color: #4caf50; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container py-4">
        <h2 class="mb-4 text-center">📈 デイトレ 反省ダッシュボード</h2>
        
        <!-- 鉄の掟（マイルール）セクション -->
        <div class="card mb-4" style="border: 2px solid #dc3545; background-color: #2c1414;">
            <div class="card-header text-white" style="background-color: #dc3545; font-size: 1.1rem;">
                ⚠️ デイトレ 鉄の掟（エントリー前に必ず確認！）
            </div>
            <div class="card-body">
                <ul class="mb-0 text-light" style="line-height: 1.8;">
                    <li><strong class="text-warning">1. 損切りは機械的に絶対行う：</strong> 理由なきホールド（お祈り）は即退場。-2%や支持線割れで無感情に切る。</li>
                    <li><strong class="text-warning">2. 高値掴み（イナゴ）の禁止：</strong> 通知から遅れて既に急騰している場合は追わない。必ず「押し目」を待つ。</li>
                    <li><strong class="text-warning">3. 欲張らずに分割利確：</strong> 急騰したら半分利確して利益を確保し、残りで「利大」を狙う。</li>
                    <li><strong class="text-warning">4. 意味不明なIRはスルー：</strong> 内容がパッと見て良いか悪いか分からない材料には絶対に手を出さない。</li>
                </ul>
            </div>
        </div>

        <div class="row">
            {% for ir in ir_data %}
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>{{ ir.code }} {{ ir.company }}</span>
                        <span class="badge badge-price">{{ ir.price }}円</span>
                    </div>
                    <div class="card-body">
                        <p class="small text-muted mb-1"><span class="badge badge-time">{{ ir.time }}</span> {{ ir.category }}</p>
                        <h6 class="card-title text-light mb-3">{{ ir.title }}</h6>
                        
                        {% if ir.reflection %}
                            <div class="p-2 rounded bg-dark border border-success">
                                <span class="reflection-text">📝 {{ ir.reflection }}</span>
                            </div>
                        {% else %}
                            <form action="{{ url_for('update_reflection') }}" method="POST">
                                <input type="hidden" name="row_idx" value="{{ loop.index0 }}">
                                <p class="mb-1 small text-muted">ワンクリック反省:</p>
                                <div class="d-flex flex-wrap gap-1">
                                    <button type="submit" name="reflection" value="焦って飛び乗った" class="btn btn-outline-danger btn-tag">焦った</button>
                                    <button type="submit" name="reflection" value="ルール通りエントリー" class="btn btn-outline-primary btn-tag">ルール通り</button>
                                    <button type="submit" name="reflection" value="見送り（正解）" class="btn btn-outline-secondary btn-tag">見送り(正)</button>
                                    <button type="submit" name="reflection" value="見送り（逃した）" class="btn btn-outline-warning btn-tag">見送り(逃)</button>
                                </div>
                            </form>
                        {% endif %}
                    </div>
                </div>
            </div>
            {% else %}
            <div class="col-12 text-center text-muted mt-5">
                <p>まだ通知されたIRはありません。</p>
            </div>
            {% endfor %}
        </div>
    </div>
</body>
</html>
"""

def read_csv():
    if not os.path.exists(CSV_FILE):
        return []
    data = []
    with open(CSV_FILE, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        header = next(reader, None)
        for row in reader:
            if len(row) >= 8:
                data.append({
                    'date': row[0],
                    'time': row[1],
                    'code': row[2],
                    'company': row[3],
                    'category': row[4],
                    'title': row[5],
                    'price': row[6],
                    'reflection': row[7]
                })
    return list(reversed(data)) # 新しい順

def update_csv_row(reversed_idx, reflection):
    if not os.path.exists(CSV_FILE):
        return
    rows = []
    with open(CSV_FILE, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        header = next(reader, None)
        for r in reader:
            rows.append(r)
    
    # reversed_idxは新しい順のインデックスなので元の配列のインデックスに変換
    actual_idx = len(rows) - 1 - reversed_idx
    if 0 <= actual_idx < len(rows):
        rows[actual_idx][7] = reflection
        
    with open(CSV_FILE, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        if header:
            writer.writerow(header)
        writer.writerows(rows)

@app.route('/')
def index():
    ir_data = read_csv()
    return render_template_string(HTML_TEMPLATE, ir_data=ir_data)

@app.route('/update', methods=['POST'])
def update_reflection():
    row_idx = int(request.form.get('row_idx', -1))
    reflection = request.form.get('reflection', '')
    if row_idx >= 0 and reflection:
        update_csv_row(row_idx, reflection)
    return redirect(url_for('index'))

if __name__ == '__main__':
    print("ダッシュボードを起動しました！ http://127.0.0.1:5000 にアクセスしてください")
    app.run(host='127.0.0.1', port=5000, debug=False)
