#!/bin/bash

# Script khởi động web server cho website luyện tập toán học lớp 4

echo "🧮 Khởi động Website Luyện Tập Toán Học Lớp 4..."
echo "📁 Thư mục: $(pwd)"

# Kiểm tra port 8080 có đang được sử dụng không
if netstat -tlnp 2>/dev/null | grep -q :8080 || ss -tlnp 2>/dev/null | grep -q :8080; then
    echo "⚠️  Port 8080 đang được sử dụng. Đang dừng process cũ..."
    pkill -f "python3 -m http.server 8080" 2>/dev/null
    sleep 2
fi

# Khởi động web server
echo "🚀 Khởi động web server trên port 8080..."
python3 -m http.server 8080 &
SERVER_PID=$!

# Chờ một chút để server khởi động
sleep 2

# Kiểm tra server có chạy thành công không
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Web server đã khởi động thành công!"
    echo "🌐 Truy cập website tại: http://localhost:8080"
    echo "📱 Hoặc từ thiết bị khác: http://$(hostname -I | awk '{print $1}'):8080"
    echo ""
    echo "📋 Hướng dẫn sử dụng:"
    echo "   • Chọn phép tính và độ khó"
    echo "   • Nhấn 'Câu hỏi mới' để bắt đầu"
    echo "   • Nhập đáp án và nhấn Enter hoặc 'Kiểm tra'"
    echo "   • Sử dụng phím tắt: N (câu mới), Ctrl+R (làm lại)"
    echo ""
    echo "🛑 Để dừng server: Ctrl+C hoặc chạy lệnh: pkill -f 'python3 -m http.server 8080'"
    echo "📊 Process ID: $SERVER_PID"
else
    echo "❌ Lỗi: Không thể khởi động web server!"
    exit 1
fi
