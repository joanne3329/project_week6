from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '<h1>Flask 應用程式運行中！</h1><p>如果你看到這個訊息，表示 Flask 正常運作。</p>'

if __name__ == '__main__':
    print("正在啟動 Flask 應用程式...")
    print("請在瀏覽器開啟: http://127.0.0.1:8080")
    app.run(debug=True, host='127.0.0.1', port=8080)