# Thiết kế Cơ sở dữ liệu cho Phân hệ Quản lý Đơn hàng của Thực khách

Dựa trên phân tích hệ thống và lược đồ ERD đã tạo, dưới đây là thiết kế chi tiết cơ sở dữ liệu cho phân hệ quản lý đơn hàng của thực khách.

## 1. Lựa chọn Hệ quản trị Cơ sở dữ liệu

Dựa trên yêu cầu về việc sử dụng Python, tối ưu tốc độ và giải pháp miễn phí, chúng tôi lựa chọn **PostgreSQL** làm hệ quản trị cơ sở dữ liệu cho hệ thống này vì:

- PostgreSQL là hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở, hoàn toàn miễn phí
- Có hiệu suất cao và khả năng mở rộng tốt
- Hỗ trợ tốt cho Python thông qua các thư viện như psycopg2, SQLAlchemy
- Có khả năng xử lý đồng thời nhiều giao dịch, phù hợp với môi trường nhà hàng
- Hỗ trợ đầy đủ các tính năng SQL tiêu chuẩn và nhiều tính năng nâng cao
- Cộng đồng hỗ trợ lớn và tài liệu phong phú

## 2. Cấu trúc Cơ sở dữ liệu

### 2.1. Bảng `users`

Lưu trữ thông tin về người dùng hệ thống (nhân viên phục vụ, nhân viên bếp, nhân viên quản lý).

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('waiter', 'chef', 'manager')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index cho việc tìm kiếm người dùng theo username
CREATE INDEX idx_users_username ON users(username);
```

### 2.2. Bảng `tables`

Lưu trữ thông tin về các bàn trong nhà hàng.

```sql
CREATE TABLE tables (
    table_id SERIAL PRIMARY KEY,
    table_number VARCHAR(10) NOT NULL UNIQUE,
    capacity INT NOT NULL,
    location VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'reserved'))
);

-- Index cho việc tìm kiếm bàn theo trạng thái
CREATE INDEX idx_tables_status ON tables(status);
```

### 2.3. Bảng `menu_categories`

Lưu trữ thông tin về các danh mục món ăn.

```sql
CREATE TABLE menu_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0
);

-- Index cho việc sắp xếp danh mục theo thứ tự hiển thị
CREATE INDEX idx_menu_categories_display_order ON menu_categories(display_order);
```

### 2.4. Bảng `menu_items`

Lưu trữ thông tin chi tiết về các món ăn.

```sql
CREATE TABLE menu_items (
    item_id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    is_buffet_item BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES menu_categories(category_id) ON DELETE CASCADE
);

-- Index cho việc tìm kiếm món ăn theo danh mục
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
-- Index cho việc tìm kiếm món ăn theo trạng thái
CREATE INDEX idx_menu_items_is_available ON menu_items(is_available);
-- Index cho việc tìm kiếm món ăn buffet
CREATE INDEX idx_menu_items_is_buffet_item ON menu_items(is_buffet_item);
```

### 2.5. Bảng `buffet_types`

Lưu trữ thông tin về các loại buffet.

```sql
CREATE TABLE buffet_types (
    buffet_type_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE
);

-- Index cho việc tìm kiếm buffet theo trạng thái
CREATE INDEX idx_buffet_types_is_available ON buffet_types(is_available);
```

### 2.6. Bảng `buffet_menu_items`

Bảng liên kết giữa các loại buffet và các món ăn trong buffet.

```sql
CREATE TABLE buffet_menu_items (
    buffet_menu_item_id SERIAL PRIMARY KEY,
    buffet_type_id INT NOT NULL,
    item_id INT NOT NULL,
    FOREIGN KEY (buffet_type_id) REFERENCES buffet_types(buffet_type_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES menu_items(item_id) ON DELETE CASCADE,
    UNIQUE (buffet_type_id, item_id)
);

-- Index cho việc tìm kiếm món ăn theo loại buffet
CREATE INDEX idx_buffet_menu_items_buffet_type_id ON buffet_menu_items(buffet_type_id);
-- Index cho việc tìm kiếm loại buffet theo món ăn
CREATE INDEX idx_buffet_menu_items_item_id ON buffet_menu_items(item_id);
```

### 2.7. Bảng `orders`

Lưu trữ thông tin về các đơn hàng.

```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    table_id INT NOT NULL,
    waiter_id INT NOT NULL,
    buffet_type_id INT,
    order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('a_la_carte', 'buffet')),
    status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'paid')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    special_notes TEXT,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    FOREIGN KEY (table_id) REFERENCES tables(table_id) ON DELETE RESTRICT,
    FOREIGN KEY (waiter_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    FOREIGN KEY (buffet_type_id) REFERENCES buffet_types(buffet_type_id) ON DELETE RESTRICT
);

-- Index cho việc tìm kiếm đơn hàng theo bàn
CREATE INDEX idx_orders_table_id ON orders(table_id);
-- Index cho việc tìm kiếm đơn hàng theo nhân viên phục vụ
CREATE INDEX idx_orders_waiter_id ON orders(waiter_id);
-- Index cho việc tìm kiếm đơn hàng theo trạng thái
CREATE INDEX idx_orders_status ON orders(status);
-- Index cho việc tìm kiếm đơn hàng theo thời gian tạo
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

### 2.8. Bảng `order_items`

Lưu trữ thông tin chi tiết về các món ăn trong đơn hàng.

```sql
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'served', 'cancelled')),
    special_notes TEXT,
    ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    served_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES menu_items(item_id) ON DELETE RESTRICT
);

-- Index cho việc tìm kiếm món ăn theo đơn hàng
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
-- Index cho việc tìm kiếm đơn hàng theo món ăn
CREATE INDEX idx_order_items_item_id ON order_items(item_id);
-- Index cho việc tìm kiếm món ăn theo trạng thái
CREATE INDEX idx_order_items_status ON order_items(status);
```

### 2.9. Bảng `bills`

Lưu trữ thông tin về các hóa đơn thanh toán.

```sql
CREATE TABLE bills (
    bill_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    cashier_id INT NOT NULL,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('cash', 'credit_card', 'debit_card', 'mobile_payment')),
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    tip DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    paid_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE RESTRICT,
    FOREIGN KEY (cashier_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    UNIQUE (order_id)
);

-- Index cho việc tìm kiếm hóa đơn theo đơn hàng
CREATE INDEX idx_bills_order_id ON bills(order_id);
-- Index cho việc tìm kiếm hóa đơn theo nhân viên thu ngân
CREATE INDEX idx_bills_cashier_id ON bills(cashier_id);
-- Index cho việc tìm kiếm hóa đơn theo thời gian thanh toán
CREATE INDEX idx_bills_paid_at ON bills(paid_at);
```

## 3. Hiện thực Cơ sở dữ liệu

Dưới đây là script Python để hiện thực cơ sở dữ liệu sử dụng thư viện psycopg2 để kết nối với PostgreSQL:

```python
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def create_database():
    # Kết nối đến PostgreSQL server
    conn = psycopg2.connect(
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432"
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Tạo database nếu chưa tồn tại
    cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'restaurant_order_management'")
    exists = cursor.fetchone()
    if not exists:
        cursor.execute("CREATE DATABASE restaurant_order_management")
        print("Database created successfully")
    else:
        print("Database already exists")
    
    cursor.close()
    conn.close()

def create_tables():
    # Kết nối đến database đã tạo
    conn = psycopg2.connect(
        database="restaurant_order_management",
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    # Tạo bảng users
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('waiter', 'chef', 'manager')),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    """)
    
    # Tạo bảng tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tables (
        table_id SERIAL PRIMARY KEY,
        table_number VARCHAR(10) NOT NULL UNIQUE,
        capacity INT NOT NULL,
        location VARCHAR(50),
        status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'reserved'))
    );
    
    CREATE INDEX IF NOT EXISTS idx_tables_status ON tables(status);
    """)
    
    # Tạo bảng menu_categories
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS menu_categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description TEXT,
        display_order INT NOT NULL DEFAULT 0
    );
    
    CREATE INDEX IF NOT EXISTS idx_menu_categories_display_order ON menu_categories(display_order);
    """)
    
    # Tạo bảng menu_items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS menu_items (
        item_id SERIAL PRIMARY KEY,
        category_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(255),
        is_available BOOLEAN NOT NULL DEFAULT TRUE,
        is_buffet_item BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (category_id) REFERENCES menu_categories(category_id) ON DELETE CASCADE
    );
    
    CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
    CREATE INDEX IF NOT EXISTS idx_menu_items_is_available ON menu_items(is_available);
    CREATE INDEX IF NOT EXISTS idx_menu_items_is_buffet_item ON menu_items(is_buffet_item);
    """)
    
    # Tạo bảng buffet_types
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS buffet_types (
        buffet_type_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        is_available BOOLEAN NOT NULL DEFAULT TRUE
    );
    
    CREATE INDEX IF NOT EXISTS idx_buffet_types_is_available ON buffet_types(is_available);
    """)
    
    # Tạo bảng buffet_menu_items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS buffet_menu_items (
        buffet_menu_item_id SERIAL PRIMARY KEY,
        buffet_type_id INT NOT NULL,
        item_id INT NOT NULL,
        FOREIGN KEY (buffet_type_id) REFERENCES buffet_types(buffet_type_id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES menu_items(item_id) ON DELETE CASCADE,
        UNIQUE (buffet_type_id, item_id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_buffet_menu_items_buffet_type_id ON buffet_menu_items(buffet_type_id);
    CREATE INDEX IF NOT EXISTS idx_buffet_menu_items_item_id ON buffet_menu_items(item_id);
    """)
    
    # Tạo bảng orders
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        order_id SERIAL PRIMARY KEY,
        table_id INT NOT NULL,
        waiter_id INT NOT NULL,
        buffet_type_id INT,
        order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('a_la_carte', 'buffet')),
        status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'paid')),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        special_notes TEXT,
        total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        FOREIGN KEY (table_id) REFERENCES tables(table_id) ON DELETE RESTRICT,
        FOREIGN KEY (waiter_id) REFERENCES users(user_id) ON DELETE RESTRICT,
        FOREIGN KEY (buffet_type_id) REFERENCES buffet_types(buffet_type_id) ON DELETE RESTRICT
    );
    
    CREATE INDEX IF NOT EXISTS idx_orders_table_id ON orders(table_id);
    CREATE INDEX IF NOT EXISTS idx_orders_waiter_id ON orders(waiter_id);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
    """)
    
    # Tạo bảng order_items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        order_item_id SERIAL PRIMARY KEY,
        order_id INT NOT NULL,
        item_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'served', 'cancelled')),
        special_notes TEXT,
        ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP,
        served_at TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
        FOREIGN KEY (item_id) REFERENCES menu_items(item_id) ON DELETE RESTRICT
    );
    
    CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
    CREATE INDEX IF NOT EXISTS idx_order_items_item_id ON order_items(item_id);
    CREATE INDEX IF NOT EXISTS idx_order_items_status ON order_items(status);
    """)
    
    # Tạo bảng bills
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS bills (
        bill_id SERIAL PRIMARY KEY,
        order_id INT NOT NULL,
        cashier_id INT NOT NULL,
        payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('cash', 'credit_card', 'debit_card', 'mobile_payment')),
        subtotal DECIMAL(10, 2) NOT NULL,
        tax DECIMAL(10, 2) NOT NULL,
        discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        tip DECIMAL(10, 2) NOT NULL DEFAULT 0,
        total_amount DECIMAL(10, 2) NOT NULL,
        paid_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE RESTRICT,
        FOREIGN KEY (cashier_id) REFERENCES users(user_id) ON DELETE RESTRICT,
        UNIQUE (order_id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_bills_order_id ON bills(order_id);
    CREATE INDEX IF NOT EXISTS idx_bills_cashier_id ON bills(cashier_id);
    CREATE INDEX IF NOT EXISTS idx_bills_paid_at ON bills(paid_at);
    """)
    
    conn.commit()
    print("Tables created successfully")
    
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_database()
    create_tables()
```

## 4. Tối ưu hóa Cơ sở dữ liệu

Để tối ưu hiệu suất của cơ sở dữ liệu, chúng tôi đã thực hiện các biện pháp sau:

1. **Sử dụng các kiểu dữ liệu phù hợp**: Chọn kiểu dữ liệu phù hợp với nội dung lưu trữ để tiết kiệm không gian và tăng tốc độ truy vấn.

2. **Tạo các chỉ mục (indexes)**: Đã tạo các chỉ mục cho các cột thường xuyên được sử dụng trong các câu truy vấn WHERE, JOIN và ORDER BY.

3. **Ràng buộc khóa ngoại (foreign key constraints)**: Đảm bảo tính toàn vẹn dữ liệu và tối ưu hóa các truy vấn JOIN.

4. **Ràng buộc CHECK**: Đảm bảo dữ liệu nhập vào đúng định dạng và giá trị mong muốn.

5. **Giá trị mặc định**: Sử dụng giá trị mặc định để giảm thiểu lỗi khi thêm dữ liệu mới.

6. **Timestamp tự động**: Sử dụng CURRENT_TIMESTAMP để tự động cập nhật thời gian tạo và cập nhật.

## 5. Kết luận

Thiết kế cơ sở dữ liệu trên đã đáp ứng đầy đủ các yêu cầu của phân hệ quản lý đơn hàng của thực khách, bao gồm:

- Hỗ trợ cả menu à-la-carte và buffet (có nhiều loại buffet)
- Quản lý thông tin về người dùng, bàn, thực đơn, đơn hàng và hóa đơn
- Tối ưu hóa hiệu suất với việc sử dụng các chỉ mục và ràng buộc phù hợp
- Sử dụng PostgreSQL là giải pháp miễn phí và tương thích tốt với Python
- Thiết kế linh hoạt, dễ dàng mở rộng trong tương lai

Cơ sở dữ liệu này sẽ là nền tảng vững chắc cho việc phát triển các chức năng của phân hệ quản lý đơn hàng, đáp ứng nhu cầu của thực khách, nhân viên phục vụ, nhân viên bếp và nhân viên quản lý.
