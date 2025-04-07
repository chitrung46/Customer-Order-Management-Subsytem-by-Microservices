# Báo cáo Phân tích và Thiết kế Phân hệ Quản lý Đơn hàng của Thực khách

## Mục lục
1. [Giới thiệu](#1-giới-thiệu)
2. [Phân tích hệ thống](#2-phân-tích-hệ-thống)
3. [Mô hình hóa hệ thống bằng UML](#3-mô-hình-hóa-hệ-thống-bằng-uml)
4. [Xây dựng API](#4-xây-dựng-api)
5. [Thiết kế và hiện thực cơ sở dữ liệu](#5-thiết-kế-và-hiện-thực-cơ-sở-dữ-liệu)
6. [Kết luận](#6-kết-luận)

## 1. Giới thiệu

Báo cáo này trình bày kết quả phân tích và thiết kế Phân hệ Quản lý Đơn hàng của Thực khách. Phân hệ này nhằm tin học hóa quá trình giao tiếp giữa nhân viên phục vụ và thực khách trong nhà hàng, cho phép thực khách, nhân viên phục vụ và nhân viên bếp tương tác theo thời gian thực, nhằm tăng cường trải nghiệm dùng bữa và giảm thiểu sai sót trong quá trình gọi món và xử lý đơn hàng.

### 1.1. Mục tiêu của phân hệ

- Tin học hóa quá trình giao tiếp giữa nhân viên phục vụ và thực khách
- Cho phép thực khách, nhân viên phục vụ và nhân viên bếp tương tác theo thời gian thực
- Tăng cường trải nghiệm dùng bữa và giảm thiểu sai sót trong quá trình gọi món và xử lý đơn hàng

### 1.2. Lợi ích dự kiến

- **Đối với thực khách**: Chủ động gọi món, kiểm soát các món đã gọi và tổng tiền hóa đơn.
- **Đối với nhân viên phục vụ**: Giảm thiểu thao tác thủ công (ghi phiếu, chuyển phiếu), đảm bảo tính chính xác của đơn hàng.
- **Đối với nhân viên bếp**: Kiểm soát chính xác các món ăn được gọi và các ghi chú đặc biệt từ thực khách.
- **Đối với nhân viên quản lý**: Quản lý hiệu quả các đơn hàng và phiếu tính tiền.

### 1.3. Phạm vi dự án

- Phân hệ chỉ phục vụ trực tiếp tại nhà hàng, không hỗ trợ đặt hàng trực tuyến.
- Phân hệ hoạt động độc lập với các phân hệ khác trong hệ thống quản lý và vận hành nhà hàng.
- Hỗ trợ cả menu à-la-carte và buffet (có nhiều loại buffet).

## 2. Phân tích hệ thống

### 2.1. Đối tượng sử dụng hệ thống

Dựa vào mô tả và hình ảnh minh họa, hệ thống có 4 đối tượng sử dụng chính:

1. **Thực khách**: Người đến nhà hàng dùng bữa, sử dụng hệ thống để gọi món, theo dõi đơn hàng và thanh toán.
2. **Nhân viên phục vụ**: Người tiếp đón thực khách, hỗ trợ gọi món và xử lý thanh toán.
3. **Nhân viên bếp**: Người nhận và xử lý các đơn hàng gọi món từ thực khách.
4. **Nhân viên quản lý**: Người quản lý các hoạt động của nhà hàng, bao gồm cả việc quản lý đơn hàng và báo cáo.

### 2.2. Chức năng chính của hệ thống

#### 2.2.1. Chức năng cho Nhân viên phục vụ

- **Tạo mới đơn hàng (mở bàn)**: Khi thực khách đến nhà hàng, nhân viên phục vụ tạo một đơn hàng mới và gán cho bàn tương ứng.
- **Hỗ trợ gọi món**: Nhân viên phục vụ có thể hỗ trợ thực khách ghi nhận các món ăn vào đơn hàng.
- **Kết thúc đơn hàng**: Khi thực khách yêu cầu thanh toán, nhân viên phục vụ kết thúc đơn hàng và tạo phiếu tính tiền.

#### 2.2.2. Chức năng cho Nhân viên bếp

- **Xem đơn hàng**: Nhân viên bếp có thể xem các đơn hàng gọi món từ thực khách, bao gồm món ăn và các ghi chú đi kèm.
- **Quản lý thực đơn**: Nhân viên bếp có thể bật/tắt món ăn tùy thuộc vào nguồn nguyên liệu sẵn có.
- **Cập nhật trạng thái món ăn**: Nhân viên bếp đánh dấu các món ăn đã được chế biến xong để nhân viên phục vụ mang đến cho thực khách.

#### 2.2.3. Chức năng cho Nhân viên quản lý

- **Thực hiện công việc của nhân viên phục vụ**: Nhân viên quản lý có thể thực hiện tất cả các chức năng của nhân viên phục vụ.
- **Tổng hợp phiếu tính tiền**: Nhân viên quản lý có thể tổng hợp các phiếu tính tiền đã được tạo trong ca trực.
- **Xem lịch sử phiếu tính tiền**: Nhân viên quản lý có thể xem lịch sử các phiếu tính tiền theo thời gian (năm, tháng, ngày).

#### 2.2.4. Chức năng cho Thực khách

- **Xem thực đơn**: Thực khách có thể xem thực đơn của nhà hàng, bao gồm cả menu à-la-carte và buffet.
- **Gọi món**: Thực khách có thể tự gọi món thông qua hệ thống.
- **Theo dõi đơn hàng**: Thực khách có thể theo dõi trạng thái của các món ăn đã gọi.
- **Xem tổng tiền**: Thực khách có thể xem tổng tiền hóa đơn của mình.
- **Yêu cầu thanh toán**: Thực khách có thể yêu cầu thanh toán khi muốn rời đi.

### 2.3. Dữ liệu cần quản lý

Dựa vào phân tích chức năng và hình ảnh minh họa, hệ thống cần quản lý các dữ liệu sau:

#### 2.3.1. Dữ liệu về Người dùng
- Thông tin về nhân viên phục vụ
- Thông tin về nhân viên bếp
- Thông tin về nhân viên quản lý
- Thông tin về thực khách (có thể không cần lưu trữ chi tiết)

#### 2.3.2. Dữ liệu về Bàn
- Mã bàn
- Trạng thái bàn (trống, đã có khách, đang phục vụ, đang thanh toán)
- Vị trí bàn
- Sức chứa của bàn

#### 2.3.3. Dữ liệu về Thực đơn
- Danh mục món ăn (categories)
- Thông tin chi tiết về món ăn (tên, mô tả, giá, hình ảnh)
- Trạng thái món ăn (có sẵn, hết)
- Loại menu (à-la-carte, buffet)
- Thông tin về các loại buffet (nếu có)

#### 2.3.4. Dữ liệu về Đơn hàng
- Mã đơn hàng
- Thời gian tạo đơn hàng
- Bàn liên quan
- Nhân viên phục vụ phụ trách
- Trạng thái đơn hàng (đang gọi món, đang chế biến, đang phục vụ, đã thanh toán)
- Tổng tiền
- Ghi chú đặc biệt

#### 2.3.5. Dữ liệu về Chi tiết đơn hàng
- Món ăn được gọi
- Số lượng
- Ghi chú đặc biệt cho từng món
- Trạng thái món ăn (đang chờ, đang chế biến, đã hoàn thành, đã phục vụ)
- Thời gian gọi món
- Thời gian hoàn thành

#### 2.3.6. Dữ liệu về Phiếu tính tiền
- Mã phiếu tính tiền
- Đơn hàng liên quan
- Thời gian thanh toán
- Phương thức thanh toán
- Tổng tiền
- Thuế
- Giảm giá (nếu có)
- Tiền tip (nếu có)
- Nhân viên xử lý thanh toán

## 3. Mô hình hóa hệ thống bằng UML

### 3.1. Lược đồ Use Case

Lược đồ Use Case mô tả các trường hợp sử dụng của hệ thống và mối quan hệ giữa các đối tượng người dùng (Thực khách, Nhân viên phục vụ, Nhân viên bếp, Nhân viên quản lý) với các chức năng của hệ thống.

Lược đồ Use Case bao gồm:

- **Actors (Tác nhân)**:
  - Thực khách
  - Nhân viên phục vụ
  - Nhân viên bếp
  - Nhân viên quản lý (extends Nhân viên phục vụ)

- **Use Cases (Trường hợp sử dụng)**:
  - Xem thực đơn
  - Gọi món
  - Theo dõi đơn hàng
  - Xem tổng tiền
  - Yêu cầu thanh toán
  - Tạo mới đơn hàng (mở bàn)
  - Hỗ trợ gọi món
  - Kết thúc đơn hàng
  - Xem đơn hàng
  - Quản lý thực đơn
  - Cập nhật trạng thái món ăn
  - Tổng hợp phiếu tính tiền
  - Xem lịch sử phiếu tính tiền

### 3.2. Lược đồ ERD (Entity Relationship Diagram)

Lược đồ ERD mô hình hóa các thực thể dữ liệu và mối quan hệ giữa chúng trong hệ thống.

Lược đồ ERD bao gồm các thực thể chính:

- **User**: Lưu thông tin về người dùng (nhân viên phục vụ, nhân viên bếp, nhân viên quản lý)
- **Table**: Lưu thông tin về các bàn trong nhà hàng
- **MenuCategory**: Danh mục món ăn
- **MenuItem**: Thông tin chi tiết về món ăn
- **BuffetType**: Các loại buffet
- **BuffetMenuItem**: Liên kết giữa loại buffet và món ăn
- **Order**: Thông tin về đơn hàng
- **OrderItem**: Chi tiết các món trong đơn hàng
- **Bill**: Thông tin hóa đơn thanh toán

Các mối quan hệ chính:
- User - Order: Một nhân viên phục vụ có thể quản lý nhiều đơn hàng
- User - Bill: Một nhân viên thu ngân có thể xử lý nhiều hóa đơn
- Table - Order: Một bàn có thể có nhiều đơn hàng (theo thời gian)
- MenuCategory - MenuItem: Một danh mục có thể chứa nhiều món ăn
- MenuItem - OrderItem: Một món ăn có thể được đặt trong nhiều đơn hàng
- BuffetType - Order: Một loại buffet có thể được chọn cho nhiều đơn hàng
- Order - OrderItem: Một đơn hàng có thể chứa nhiều món ăn
- Order - Bill: Một đơn hàng tạo ra một hóa đơn

## 4. Xây dựng API

Dựa trên phân tích hệ thống và các lược đồ UML, chúng tôi đã xác định và mô tả chi tiết các API cần thiết cho hệ thống.

### 4.1. API Quản lý Người dùng (User Management)

- **Đăng nhập (Login)**: Xác thực người dùng và cấp quyền truy cập
- **Lấy thông tin người dùng (Get User Info)**: Lấy thông tin chi tiết của người dùng

### 4.2. API Quản lý Bàn (Table Management)

- **Lấy danh sách bàn (Get Tables)**: Lấy danh sách tất cả các bàn hoặc lọc theo trạng thái
- **Cập nhật trạng thái bàn (Update Table Status)**: Cập nhật trạng thái của bàn (trống, đã có khách, đang phục vụ)

### 4.3. API Quản lý Thực đơn (Menu Management)

- **Lấy danh mục thực đơn (Get Menu Categories)**: Lấy danh sách các danh mục món ăn
- **Lấy danh sách món ăn theo danh mục (Get Menu Items by Category)**: Lấy danh sách món ăn thuộc một danh mục
- **Lấy thông tin chi tiết món ăn (Get Menu Item Details)**: Lấy thông tin chi tiết của một món ăn
- **Cập nhật trạng thái món ăn (Update Menu Item Availability)**: Cập nhật trạng thái có sẵn của món ăn
- **Lấy danh sách loại buffet (Get Buffet Types)**: Lấy danh sách các loại buffet
- **Lấy danh sách món ăn theo loại buffet (Get Menu Items by Buffet Type)**: Lấy danh sách món ăn thuộc một loại buffet

### 4.4. API Quản lý Đơn hàng (Order Management)

- **Tạo đơn hàng mới (Create New Order)**: Tạo một đơn hàng mới cho một bàn
- **Thêm món vào đơn hàng (Add Item to Order)**: Thêm một món ăn vào đơn hàng
- **Lấy thông tin đơn hàng (Get Order Details)**: Lấy thông tin chi tiết của một đơn hàng
- **Lấy danh sách đơn hàng (Get Orders)**: Lấy danh sách đơn hàng, có thể lọc theo trạng thái, bàn, nhân viên
- **Cập nhật trạng thái món ăn trong đơn hàng (Update Order Item Status)**: Cập nhật trạng thái của một món ăn trong đơn hàng
- **Cập nhật trạng thái đơn hàng (Update Order Status)**: Cập nhật trạng thái của đơn hàng

### 4.5. API Quản lý Hóa đơn (Bill Management)

- **Tạo hóa đơn (Create Bill)**: Tạo hóa đơn cho một đơn hàng
- **Lấy thông tin hóa đơn (Get Bill Details)**: Lấy thông tin chi tiết của một hóa đơn
- **Lấy danh sách hóa đơn (Get Bills)**: Lấy danh sách hóa đơn, có thể lọc theo thời gian, nhân viên
- **Tổng hợp hóa đơn theo thời gian (Get Bill Summary)**: Lấy thông tin tổng hợp hóa đơn theo ngày, tháng, năm

### 4.6. API cho Thực khách (Customer Facing)

- **Lấy thực đơn (Get Menu)**: Lấy thông tin thực đơn cho thực khách
- **Lấy thông tin đơn hàng hiện tại (Get Current Order)**: Lấy thông tin đơn hàng hiện tại của một bàn
- **Gọi món (Place Order)**: Thực khách gọi món
- **Yêu cầu thanh toán (Request Bill)**: Thực khách yêu cầu thanh toán

## 5. Thiết kế và hiện thực cơ sở dữ liệu

### 5.1. Lựa chọn Hệ quản trị Cơ sở dữ liệu

Dựa trên yêu cầu về việc sử dụng Python, tối ưu tốc độ và giải pháp miễn phí, chúng tôi đã lựa chọn **PostgreSQL** làm hệ quản trị cơ sở dữ liệu cho hệ thống này vì:

- PostgreSQL là hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở, hoàn toàn miễn phí
- Có hiệu suất cao và khả năng mở rộng tốt
- Hỗ trợ tốt cho Python thông qua các thư viện như psycopg2, SQLAlchemy
- Có khả năng xử lý đồng thời nhiều giao dịch, phù hợp với môi trường nhà hàng
- Hỗ trợ đầy đủ các tính năng SQL tiêu chuẩn và nhiều tính năng nâng cao
- Cộng đồng hỗ trợ lớn và tài liệu phong phú

### 5.2. Cấu trúc Cơ sở dữ liệu

Cơ sở dữ liệu bao gồm 9 bảng chính:

1. **users**: Lưu trữ thông tin về người dùng hệ thống
2. **tables**: Lưu trữ thông tin về các bàn trong nhà hàng
3. **menu_categories**: Lưu trữ thông tin về các danh mục món ăn
4. **menu_items**: Lưu trữ thông tin chi tiết về các món ăn
5. **buffet_types**: Lưu trữ thông tin về các loại buffet
6. **buffet_menu_items**: Bảng liên kết giữa các loại buffet và các món ăn trong buffet
7. **orders**: Lưu trữ thông tin về các đơn hàng
8. **order_items**: Lưu trữ thông tin chi tiết về các món ăn trong đơn hàng
9. **bills**: Lưu trữ thông tin về các hóa đơn thanh toán

Mỗi bảng đều được thiết kế với các ràng buộc khóa chính, khóa ngoại và các ràng buộc CHECK để đảm bảo tính toàn vẹn dữ liệu. Các chỉ mục (indexes) cũng được tạo để tối ưu hiệu suất truy vấn.

### 5.3. Hiện thực Cơ sở dữ liệu

Chúng tôi đã tạo một script Python (database_implementation.py) để hiện thực cơ sở dữ liệu PostgreSQL theo thiết kế đã hoàn thành. Script này bao gồm các chức năng:

1. Tạo database "restaurant_order_management"
2. Tạo các bảng với đầy đủ ràng buộc và chỉ mục như đã thiết kế
3. Thêm dữ liệu mẫu vào các bảng (users, tables, menu_categories, menu_items, buffet_types, buffet_menu_items)
4. Kiểm tra kết nối và truy vấn dữ liệu

Script này sử dụng thư viện psycopg2 để kết nối với PostgreSQL và thực hiện các câu lệnh SQL.

### 5.4. Tối ưu hóa Cơ sở dữ liệu

Để tối ưu hiệu suất của cơ sở dữ liệu, chúng tôi đã thực hiện các biện pháp sau:

1. **Sử dụng các kiểu dữ liệu phù hợp**: Chọn kiểu dữ liệu phù hợp với nội dung lưu trữ để tiết kiệm không gian và tăng tốc độ truy vấn.
2. **Tạo các chỉ mục (indexes)**: Đã tạo các chỉ mục cho các cột thường xuyên được sử dụng trong các câu truy vấn WHERE, JOIN và ORDER BY.
3. **Ràng buộc khóa ngoại (foreign key constraints)**: Đảm bảo tính toàn vẹn dữ liệu và tối ưu hóa các truy vấn JOIN.
4. **Ràng buộc CHECK**: Đảm bảo dữ liệu nhập vào đúng định dạng và giá trị mong muốn.
5. **Giá trị mặc định**: Sử dụng giá trị mặc định để giảm thiểu lỗi khi thêm dữ liệu mới.
6. **Timestamp tự động**: Sử dụng CURRENT_TIMESTAMP để tự động cập nhật thời gian tạo và cập nhật.

## 6. Kết luận

Chúng tôi đã hoàn thành việc phân tích và thiết kế Phân hệ Quản lý Đơn hàng của Thực khách, bao gồm:

1. **Phân tích hệ thống**: Xác định các đối tượng sử dụng, chức năng chính và dữ liệu cần quản lý.
2. **Mô hình hóa hệ thống bằng UML**: Tạo lược đồ Use Case và ERD để mô tả các trường hợp sử dụng và mối quan hệ giữa các thực thể dữ liệu.
3. **Xây dựng API**: Xác định và mô tả chi tiết các API cần thiết cho hệ thống.
4. **Thiết kế và hiện thực cơ sở dữ liệu**: Lựa chọn PostgreSQL làm hệ quản trị cơ sở dữ liệu, thiết kế cấu trúc các bảng và hiện thực bằng script Python.

Phân hệ này đáp ứng đầy đủ các yêu cầu đã đề ra, bao gồm:
- Hỗ trợ cả menu à-la-carte và buffet (có nhiều loại buffet)
- Tương tác thời gian thực giữa thực khách, nhân viên phục vụ và nhân viên bếp
- Tối ưu hóa hiệu suất với việc sử dụng PostgreSQL và các kỹ thuật tối ưu cơ sở dữ liệu
- Sử dụng Python và các công nghệ miễn phí

Với thiết kế này, hệ thống có thể dễ dàng được phát triển và triển khai trong môi trường thực tế, mang lại lợi ích cho cả thực khách và nhân viên nhà hàng.
