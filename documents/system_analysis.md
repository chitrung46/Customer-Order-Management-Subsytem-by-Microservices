# Phân tích hệ thống Quản lý Đơn hàng của Thực khách

## 1. Tổng quan hệ thống

Phân hệ Quản lý Đơn hàng của Thực khách là một hệ thống tin học hóa quá trình giao tiếp giữa nhân viên phục vụ và thực khách trong nhà hàng. Hệ thống cho phép thực khách, nhân viên phục vụ và nhân viên bếp tương tác theo thời gian thực, nhằm tăng cường trải nghiệm dùng bữa và giảm thiểu sai sót trong quá trình gọi món và xử lý đơn hàng.

## 2. Đối tượng sử dụng hệ thống

Dựa vào mô tả và hình ảnh minh họa, hệ thống có 4 đối tượng sử dụng chính:

1. **Thực khách**: Người đến nhà hàng dùng bữa, sử dụng hệ thống để gọi món, theo dõi đơn hàng và thanh toán.
2. **Nhân viên phục vụ**: Người tiếp đón thực khách, hỗ trợ gọi món và xử lý thanh toán.
3. **Nhân viên bếp**: Người nhận và xử lý các đơn hàng gọi món từ thực khách.
4. **Nhân viên quản lý**: Người quản lý các hoạt động của nhà hàng, bao gồm cả việc quản lý đơn hàng và báo cáo.

## 3. Chức năng chính của hệ thống

### 3.1. Chức năng cho Nhân viên phục vụ

- **Tạo mới đơn hàng (mở bàn)**: Khi thực khách đến nhà hàng, nhân viên phục vụ tạo một đơn hàng mới và gán cho bàn tương ứng.
- **Hỗ trợ gọi món**: Nhân viên phục vụ có thể hỗ trợ thực khách ghi nhận các món ăn vào đơn hàng.
- **Kết thúc đơn hàng**: Khi thực khách yêu cầu thanh toán, nhân viên phục vụ kết thúc đơn hàng và tạo phiếu tính tiền.

### 3.2. Chức năng cho Nhân viên bếp

- **Xem đơn hàng**: Nhân viên bếp có thể xem các đơn hàng gọi món từ thực khách, bao gồm món ăn và các ghi chú đi kèm.
- **Quản lý thực đơn**: Nhân viên bếp có thể bật/tắt món ăn tùy thuộc vào nguồn nguyên liệu sẵn có.
- **Cập nhật trạng thái món ăn**: Nhân viên bếp đánh dấu các món ăn đã được chế biến xong để nhân viên phục vụ mang đến cho thực khách.

### 3.3. Chức năng cho Nhân viên quản lý

- **Thực hiện công việc của nhân viên phục vụ**: Nhân viên quản lý có thể thực hiện tất cả các chức năng của nhân viên phục vụ.
- **Tổng hợp phiếu tính tiền**: Nhân viên quản lý có thể tổng hợp các phiếu tính tiền đã được tạo trong ca trực.
- **Xem lịch sử phiếu tính tiền**: Nhân viên quản lý có thể xem lịch sử các phiếu tính tiền theo thời gian (năm, tháng, ngày).

### 3.4. Chức năng cho Thực khách

- **Xem thực đơn**: Thực khách có thể xem thực đơn của nhà hàng, bao gồm cả menu à-la-carte và buffet.
- **Gọi món**: Thực khách có thể tự gọi món thông qua hệ thống.
- **Theo dõi đơn hàng**: Thực khách có thể theo dõi trạng thái của các món ăn đã gọi.
- **Xem tổng tiền**: Thực khách có thể xem tổng tiền hóa đơn của mình.
- **Yêu cầu thanh toán**: Thực khách có thể yêu cầu thanh toán khi muốn rời đi.

## 4. Dữ liệu cần quản lý

Dựa vào phân tích chức năng và hình ảnh minh họa, hệ thống cần quản lý các dữ liệu sau:

### 4.1. Dữ liệu về Người dùng
- Thông tin về nhân viên phục vụ
- Thông tin về nhân viên bếp
- Thông tin về nhân viên quản lý
- Thông tin về thực khách (có thể không cần lưu trữ chi tiết)

### 4.2. Dữ liệu về Bàn
- Mã bàn
- Trạng thái bàn (trống, đã có khách, đang phục vụ, đang thanh toán)
- Vị trí bàn
- Sức chứa của bàn

### 4.3. Dữ liệu về Thực đơn
- Danh mục món ăn (categories)
- Thông tin chi tiết về món ăn (tên, mô tả, giá, hình ảnh)
- Trạng thái món ăn (có sẵn, hết)
- Loại menu (à-la-carte, buffet)
- Thông tin về các loại buffet (nếu có)

### 4.4. Dữ liệu về Đơn hàng
- Mã đơn hàng
- Thời gian tạo đơn hàng
- Bàn liên quan
- Nhân viên phục vụ phụ trách
- Trạng thái đơn hàng (đang gọi món, đang chế biến, đang phục vụ, đã thanh toán)
- Tổng tiền
- Ghi chú đặc biệt

### 4.5. Dữ liệu về Chi tiết đơn hàng
- Món ăn được gọi
- Số lượng
- Ghi chú đặc biệt cho từng món
- Trạng thái món ăn (đang chờ, đang chế biến, đã hoàn thành, đã phục vụ)
- Thời gian gọi món
- Thời gian hoàn thành

### 4.6. Dữ liệu về Phiếu tính tiền
- Mã phiếu tính tiền
- Đơn hàng liên quan
- Thời gian thanh toán
- Phương thức thanh toán
- Tổng tiền
- Thuế
- Giảm giá (nếu có)
- Tiền tip (nếu có)
- Nhân viên xử lý thanh toán

## 5. Phân tích hình ảnh minh họa

Từ hình ảnh minh họa (Hình 1), có thể thấy:

- Hệ thống được triển khai trên thiết bị di động (máy tính bảng) để thuận tiện cho việc gọi món.
- Giao diện hiển thị danh sách các món ăn với hình ảnh minh họa.
- Có menu bên trái để chọn danh mục món ăn (BUFFET, ĐỒ UỐNG, v.v.).
- Mỗi món ăn có nút "+" để thêm vào đơn hàng.
- Giao diện được thiết kế trực quan, dễ sử dụng cho cả nhân viên và thực khách.

Dựa vào phân tích này, hệ thống cần được thiết kế để hỗ trợ cả hai loại menu (à-la-carte và buffet), với giao diện thân thiện với người dùng và khả năng tương tác thời gian thực giữa các đối tượng sử dụng.
