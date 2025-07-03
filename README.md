# Website Luyện Tập Toán Học Lớp 4

## Mô tả
Website luyện tập toán học dành cho học sinh lớp 4 với các phép tính cơ bản: cộng, trừ, nhân, chia trong phạm vi đến hàng chục nghìn. Tất cả phép tính xuất hiện ngẫu nhiên để luyện tập toàn diện.

## Tính năng

### 🧮 Phép tính (Ngẫu nhiên)
- **Phép cộng (+)**: Cộng hai số trong phạm vi được chọn
- **Phép trừ (-)**: Trừ hai số (kết quả luôn dương)
- **Phép nhân (×)**: Nhân với các số từ 1-12
- **Phép chia (÷)**: Chia cho kết quả là số nguyên
- **🎲 Tự động ngẫu nhiên**: Tất cả phép tính xuất hiện ngẫu nhiên

### 📊 Cấp độ
- **🟢 Cấp độ 1 - Dễ**: Số từ 1-100
- **🟡 Cấp độ 2 - Trung bình**: Số từ 1-1000  
- **🔴 Cấp độ 3 - Khó**: Số từ 1-10000

### 🎯 Hệ thống điểm
- Điểm cơ bản: 10 điểm/câu đúng
- Thưởng tốc độ: +1-10 điểm (càng nhanh càng nhiều)
- Theo dõi tỷ lệ chính xác

### 🏆 Thành tích
- **🎯 Câu đầu tiên**: Trả lời đúng câu hỏi đầu tiên
- **🔥 Chuỗi 5**: Trả lời đúng 5 câu liên tiếp
- **⭐ Chuỗi 10**: Trả lời đúng 10 câu liên tiếp
- **👑 Bậc thầy toán học**: Trả lời đúng 20 câu
- **⚡ Tốc độ ánh sáng**: Trả lời đúng trong 3 giây
- **💯 Hoàn hảo**: Đạt 100% chính xác trong 10 câu

### 💾 Lưu trữ
- Tự động lưu điểm số và thành tích
- Khôi phục dữ liệu khi mở lại trang

## Cách sử dụng

### Điều khiển cơ bản
1. Chọn cấp độ (1, 2, hoặc 3)
2. Nhấn "Câu hỏi mới" để bắt đầu
3. Chọn đáp án từ 4 lựa chọn A, B, C, D
4. Xem kết quả và tiếp tục với câu hỏi mới
5. Phép tính sẽ tự động ngẫu nhiên giữa +, -, ×, ÷

### Phím tắt
- **A, B, C, D**: Chọn đáp án tương ứng
- **1, 2, 3, 4**: Chọn đáp án A, B, C, D
- **N**: Câu hỏi mới
- **Ctrl+R**: Làm lại (xóa tất cả dữ liệu)

### Mobile
- **Vuốt lên**: Tạo câu hỏi mới
- Giao diện responsive, thân thiện với thiết bị di động

## Cài đặt

### Yêu cầu
- Web server (Apache/Nginx)
- Trình duyệt hỗ trợ HTML5, CSS3, JavaScript ES6

### Triển khai
1. Copy các file vào thư mục web server
2. Truy cập qua trình duyệt
3. Không cần cơ sở dữ liệu hay server-side processing

## Cấu trúc file
```
toan4/
├── index.html      # Giao diện chính
├── style.css       # Styling và responsive design
├── script.js       # Logic game và tương tác
└── README.md       # Hướng dẫn này
```

## Tính năng kỹ thuật
- **Progressive Web App**: Có thể hoạt động offline
- **Local Storage**: Lưu trữ dữ liệu trên máy người dùng
- **Responsive Design**: Tương thích mọi thiết bị
- **Accessibility**: Hỗ trợ người khuyết tật
- **Performance**: Tối ưu tốc độ tải trang

## Tùy chỉnh
Có thể dễ dàng tùy chỉnh:
- Phạm vi số trong hàm `getRandomNumber()`
- Thêm phép tính mới trong `generateNewQuestion()`
- Thêm thành tích mới trong `achievementDefinitions`
- Thay đổi giao diện trong `style.css`

## Hỗ trợ
Website được thiết kế để:
- Khuyến khích học tập qua game hóa
- Phát triển kỹ năng tính toán nhanh
- Theo dõi tiến độ học tập
- Tạo động lực qua hệ thống thành tích

## Tương thích
- Chrome, Firefox, Safari, Edge (phiên bản mới)
- iOS Safari, Chrome Mobile
- Tablet và desktop

---
*Được tạo để hỗ trợ việc học toán của các em học sinh lớp 4*
