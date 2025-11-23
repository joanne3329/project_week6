#!/usr/bin/env python3
import sys
import traceback

try:
    print("正在啟動 Flask 應用程式...")
    print("Python 版本:", sys.version)
    
    # 導入必要模組
    print("正在導入 Flask...")
    from flask import Flask
    
    print("正在導入 models...")
    from models import db, User, bcrypt
    
    print("正在導入 simulate...")
    from simulate import simulate_bp
    
    print("正在導入主應用...")
    from app import app
    
    print("所有模組導入成功！")
    print("正在啟動服務器...")
    print("服務器將在 http://localhost:8080 上運行")
    print("按 Ctrl+C 停止服務器")
    
    # 創建資料庫表
    with app.app_context():
        db.create_all()
        print("資料庫初始化完成")
    
    # 啟動應用
    app.run(debug=True, port=8080, host='127.0.0.1')
    
except Exception as e:
    print("❌ 錯誤發生:")
    print(f"錯誤類型: {type(e).__name__}")
    print(f"錯誤訊息: {str(e)}")
    print("\n詳細錯誤追蹤:")
    traceback.print_exc()
    input("\n按 Enter 鍵退出...")