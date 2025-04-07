# Hướng dẫn triển khai Hệ thống Quản lý Đơn hàng Nhà hàng

Tài liệu này cung cấp hướng dẫn chi tiết về cách triển khai Hệ thống Quản lý Đơn hàng Nhà hàng lên môi trường sản xuất sử dụng Cloudflare Pages và Cloudflare D1 Database.

## Cấu trúc dự án

Dự án được xây dựng với Next.js và sử dụng Cloudflare D1 làm cơ sở dữ liệu. Cấu trúc dự án bao gồm:

- `src/app`: Chứa các trang và components của ứng dụng
- `src/lib`: Chứa các utility functions và API clients
- `migrations`: Chứa các file SQL để thiết lập cơ sở dữ liệu
- `public`: Chứa các tài nguyên tĩnh
- `wrangler.toml`: File cấu hình cho Cloudflare Workers

## Yêu cầu hệ thống

- Node.js 18 trở lên
- Tài khoản Cloudflare (miễn phí)
- Wrangler CLI (công cụ dòng lệnh của Cloudflare)

## Các bước triển khai

### 1. Cài đặt các dependencies

```bash
npm install -g wrangler
cd restaurant-order-system
npm install
```

### 2. Cấu hình Cloudflare D1 Database

Tạo database D1 trên Cloudflare:

```bash
wrangler d1 create restaurant_order_system
```

Sau khi tạo database, cập nhật file `wrangler.toml` với database ID được cung cấp:

```toml
name = "restaurant-order-system"
compatibility_date = "2023-12-01"

[[d1_databases]]
binding = "DB"
database_name = "restaurant_order_system"
database_id = "your-database-id-here"
```

### 3. Áp dụng migrations để thiết lập cơ sở dữ liệu

```bash
wrangler d1 execute restaurant_order_system --local --file=migrations/0001_initial.sql
wrangler d1 execute restaurant_order_system --file=migrations/0001_initial.sql
```

Lệnh đầu tiên áp dụng migrations cho môi trường local, lệnh thứ hai áp dụng cho môi trường production.

### 4. Chạy ứng dụng ở môi trường local để kiểm tra

```bash
npm run dev
```

Ứng dụng sẽ chạy ở địa chỉ http://localhost:3000

### 5. Xây dựng và triển khai ứng dụng lên Cloudflare Pages

```bash
npm run build
wrangler pages deploy .next
```

Sau khi triển khai, Cloudflare sẽ cung cấp một URL để truy cập ứng dụng của bạn.

## Cấu trúc API

API của hệ thống được tổ chức theo mô hình RESTful:

- `/api/users`: Quản lý người dùng
- `/api/tables`: Quản lý bàn
- `/api/menu`: Quản lý thực đơn
- `/api/orders`: Quản lý đơn hàng
- `/api/bills`: Quản lý hóa đơn

## Giao diện người dùng

Hệ thống có các giao diện riêng biệt cho từng loại người dùng:

- `/customer`: Giao diện cho thực khách
- `/waiter`: Giao diện cho nhân viên phục vụ
- `/chef`: Giao diện cho nhân viên bếp
- `/manager`: Giao diện cho nhân viên quản lý

## Bảo trì và cập nhật

### Cập nhật cơ sở dữ liệu

Khi cần thay đổi cấu trúc cơ sở dữ liệu, tạo một file migration mới trong thư mục `migrations` và áp dụng nó:

```bash
wrangler d1 execute restaurant_order_system --file=migrations/your_new_migration.sql
```

### Cập nhật ứng dụng

Để cập nhật ứng dụng, chỉ cần thực hiện các thay đổi cần thiết, xây dựng lại và triển khai:

```bash
npm run build
wrangler pages deploy .next
```

## Khắc phục sự cố

### Vấn đề với cơ sở dữ liệu

Nếu gặp vấn đề với cơ sở dữ liệu, bạn có thể kiểm tra logs:

```bash
wrangler d1 execute restaurant_order_system --command="SELECT * FROM sqlite_master"
```

### Vấn đề với ứng dụng

Kiểm tra logs của Cloudflare Pages để xác định vấn đề:

```bash
wrangler pages deployment tail
```

## Kết luận

Hệ thống Quản lý Đơn hàng Nhà hàng đã được triển khai thành công lên Cloudflare Pages và sử dụng Cloudflare D1 làm cơ sở dữ liệu. Hệ thống hỗ trợ đầy đủ các chức năng quản lý đơn hàng, bao gồm cả menu à-la-carte và buffet, và có giao diện riêng biệt cho từng loại người dùng.
