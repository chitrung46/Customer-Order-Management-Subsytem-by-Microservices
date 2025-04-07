# API Specifications cho Phân hệ Quản lý Đơn hàng của Thực khách

Dựa trên phân tích hệ thống và các lược đồ UML đã tạo, dưới đây là danh sách các API cần thiết cho phân hệ quản lý đơn hàng của thực khách.

## 1. API Quản lý Người dùng (User Management)

### 1.1. Đăng nhập (Login)
- **Endpoint**: `/api/auth/login`
- **Method**: POST
- **Input**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Output**:
  ```json
  {
    "user_id": "integer",
    "username": "string",
    "full_name": "string",
    "role": "string (waiter/chef/manager)",
    "token": "string"
  }
  ```

### 1.2. Lấy thông tin người dùng (Get User Info)
- **Endpoint**: `/api/users/{user_id}`
- **Method**: GET
- **Input**: Path parameter `user_id`
- **Output**:
  ```json
  {
    "user_id": "integer",
    "username": "string",
    "full_name": "string",
    "role": "string (waiter/chef/manager)",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

## 2. API Quản lý Bàn (Table Management)

### 2.1. Lấy danh sách bàn (Get Tables)
- **Endpoint**: `/api/tables`
- **Method**: GET
- **Input**: Query parameters `status` (optional)
- **Output**:
  ```json
  [
    {
      "table_id": "integer",
      "table_number": "string",
      "capacity": "integer",
      "location": "string",
      "status": "string (available/occupied/reserved)"
    }
  ]
  ```

### 2.2. Cập nhật trạng thái bàn (Update Table Status)
- **Endpoint**: `/api/tables/{table_id}`
- **Method**: PATCH
- **Input**:
  ```json
  {
    "status": "string (available/occupied/reserved)"
  }
  ```
- **Output**:
  ```json
  {
    "table_id": "integer",
    "table_number": "string",
    "status": "string (available/occupied/reserved)",
    "updated_at": "timestamp"
  }
  ```

## 3. API Quản lý Thực đơn (Menu Management)

### 3.1. Lấy danh mục thực đơn (Get Menu Categories)
- **Endpoint**: `/api/menu/categories`
- **Method**: GET
- **Input**: None
- **Output**:
  ```json
  [
    {
      "category_id": "integer",
      "name": "string",
      "description": "string",
      "display_order": "integer"
    }
  ]
  ```

### 3.2. Lấy danh sách món ăn theo danh mục (Get Menu Items by Category)
- **Endpoint**: `/api/menu/categories/{category_id}/items`
- **Method**: GET
- **Input**: Path parameter `category_id`
- **Output**:
  ```json
  [
    {
      "item_id": "integer",
      "name": "string",
      "description": "string",
      "price": "decimal",
      "image_url": "string",
      "is_available": "boolean",
      "is_buffet_item": "boolean"
    }
  ]
  ```

### 3.3. Lấy thông tin chi tiết món ăn (Get Menu Item Details)
- **Endpoint**: `/api/menu/items/{item_id}`
- **Method**: GET
- **Input**: Path parameter `item_id`
- **Output**:
  ```json
  {
    "item_id": "integer",
    "category_id": "integer",
    "name": "string",
    "description": "string",
    "price": "decimal",
    "image_url": "string",
    "is_available": "boolean",
    "is_buffet_item": "boolean"
  }
  ```

### 3.4. Cập nhật trạng thái món ăn (Update Menu Item Availability)
- **Endpoint**: `/api/menu/items/{item_id}/availability`
- **Method**: PATCH
- **Input**:
  ```json
  {
    "is_available": "boolean"
  }
  ```
- **Output**:
  ```json
  {
    "item_id": "integer",
    "name": "string",
    "is_available": "boolean",
    "updated_at": "timestamp"
  }
  ```

### 3.5. Lấy danh sách loại buffet (Get Buffet Types)
- **Endpoint**: `/api/menu/buffet-types`
- **Method**: GET
- **Input**: None
- **Output**:
  ```json
  [
    {
      "buffet_type_id": "integer",
      "name": "string",
      "description": "string",
      "price": "decimal",
      "is_available": "boolean"
    }
  ]
  ```

### 3.6. Lấy danh sách món ăn theo loại buffet (Get Menu Items by Buffet Type)
- **Endpoint**: `/api/menu/buffet-types/{buffet_type_id}/items`
- **Method**: GET
- **Input**: Path parameter `buffet_type_id`
- **Output**:
  ```json
  [
    {
      "item_id": "integer",
      "name": "string",
      "description": "string",
      "image_url": "string",
      "is_available": "boolean"
    }
  ]
  ```

## 4. API Quản lý Đơn hàng (Order Management)

### 4.1. Tạo đơn hàng mới (Create New Order)
- **Endpoint**: `/api/orders`
- **Method**: POST
- **Input**:
  ```json
  {
    "table_id": "integer",
    "waiter_id": "integer",
    "order_type": "string (a_la_carte/buffet)",
    "buffet_type_id": "integer (optional, required if order_type is buffet)",
    "special_notes": "string (optional)"
  }
  ```
- **Output**:
  ```json
  {
    "order_id": "integer",
    "table_id": "integer",
    "waiter_id": "integer",
    "order_type": "string (a_la_carte/buffet)",
    "buffet_type_id": "integer (if applicable)",
    "status": "string (open)",
    "created_at": "timestamp",
    "special_notes": "string"
  }
  ```

### 4.2. Thêm món vào đơn hàng (Add Item to Order)
- **Endpoint**: `/api/orders/{order_id}/items`
- **Method**: POST
- **Input**:
  ```json
  {
    "item_id": "integer",
    "quantity": "integer",
    "special_notes": "string (optional)"
  }
  ```
- **Output**:
  ```json
  {
    "order_item_id": "integer",
    "order_id": "integer",
    "item_id": "integer",
    "name": "string",
    "quantity": "integer",
    "status": "string (pending)",
    "special_notes": "string",
    "ordered_at": "timestamp"
  }
  ```

### 4.3. Lấy thông tin đơn hàng (Get Order Details)
- **Endpoint**: `/api/orders/{order_id}`
- **Method**: GET
- **Input**: Path parameter `order_id`
- **Output**:
  ```json
  {
    "order_id": "integer",
    "table_id": "integer",
    "table_number": "string",
    "waiter_id": "integer",
    "waiter_name": "string",
    "order_type": "string (a_la_carte/buffet)",
    "buffet_type_id": "integer (if applicable)",
    "buffet_name": "string (if applicable)",
    "status": "string (open/in_progress/completed/paid)",
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "special_notes": "string",
    "total_amount": "decimal",
    "items": [
      {
        "order_item_id": "integer",
        "item_id": "integer",
        "name": "string",
        "quantity": "integer",
        "status": "string (pending/preparing/ready/served/cancelled)",
        "special_notes": "string",
        "ordered_at": "timestamp",
        "completed_at": "timestamp (if applicable)",
        "served_at": "timestamp (if applicable)"
      }
    ]
  }
  ```

### 4.4. Lấy danh sách đơn hàng (Get Orders)
- **Endpoint**: `/api/orders`
- **Method**: GET
- **Input**: Query parameters `status`, `table_id`, `waiter_id` (all optional)
- **Output**:
  ```json
  [
    {
      "order_id": "integer",
      "table_id": "integer",
      "table_number": "string",
      "waiter_id": "integer",
      "waiter_name": "string",
      "order_type": "string (a_la_carte/buffet)",
      "status": "string (open/in_progress/completed/paid)",
      "created_at": "timestamp",
      "total_amount": "decimal"
    }
  ]
  ```

### 4.5. Cập nhật trạng thái món ăn trong đơn hàng (Update Order Item Status)
- **Endpoint**: `/api/orders/{order_id}/items/{order_item_id}/status`
- **Method**: PATCH
- **Input**:
  ```json
  {
    "status": "string (pending/preparing/ready/served/cancelled)"
  }
  ```
- **Output**:
  ```json
  {
    "order_item_id": "integer",
    "order_id": "integer",
    "item_id": "integer",
    "name": "string",
    "status": "string (pending/preparing/ready/served/cancelled)",
    "updated_at": "timestamp"
  }
  ```

### 4.6. Cập nhật trạng thái đơn hàng (Update Order Status)
- **Endpoint**: `/api/orders/{order_id}/status`
- **Method**: PATCH
- **Input**:
  ```json
  {
    "status": "string (open/in_progress/completed/paid)"
  }
  ```
- **Output**:
  ```json
  {
    "order_id": "integer",
    "status": "string (open/in_progress/completed/paid)",
    "updated_at": "timestamp"
  }
  ```

## 5. API Quản lý Hóa đơn (Bill Management)

### 5.1. Tạo hóa đơn (Create Bill)
- **Endpoint**: `/api/bills`
- **Method**: POST
- **Input**:
  ```json
  {
    "order_id": "integer",
    "cashier_id": "integer",
    "payment_method": "string (cash/credit_card/debit_card/mobile_payment)",
    "discount": "decimal (optional)",
    "tip": "decimal (optional)"
  }
  ```
- **Output**:
  ```json
  {
    "bill_id": "integer",
    "order_id": "integer",
    "cashier_id": "integer",
    "payment_method": "string",
    "subtotal": "decimal",
    "tax": "decimal",
    "discount": "decimal",
    "tip": "decimal",
    "total_amount": "decimal",
    "paid_at": "timestamp"
  }
  ```

### 5.2. Lấy thông tin hóa đơn (Get Bill Details)
- **Endpoint**: `/api/bills/{bill_id}`
- **Method**: GET
- **Input**: Path parameter `bill_id`
- **Output**:
  ```json
  {
    "bill_id": "integer",
    "order_id": "integer",
    "cashier_id": "integer",
    "cashier_name": "string",
    "payment_method": "string",
    "subtotal": "decimal",
    "tax": "decimal",
    "discount": "decimal",
    "tip": "decimal",
    "total_amount": "decimal",
    "paid_at": "timestamp",
    "order_details": {
      "table_number": "string",
      "order_type": "string (a_la_carte/buffet)",
      "buffet_name": "string (if applicable)",
      "created_at": "timestamp",
      "items": [
        {
          "name": "string",
          "quantity": "integer",
          "price": "decimal"
        }
      ]
    }
  }
  ```

### 5.3. Lấy danh sách hóa đơn (Get Bills)
- **Endpoint**: `/api/bills`
- **Method**: GET
- **Input**: Query parameters `start_date`, `end_date`, `cashier_id` (all optional)
- **Output**:
  ```json
  [
    {
      "bill_id": "integer",
      "order_id": "integer",
      "table_number": "string",
      "cashier_id": "integer",
      "cashier_name": "string",
      "payment_method": "string",
      "total_amount": "decimal",
      "paid_at": "timestamp"
    }
  ]
  ```

### 5.4. Tổng hợp hóa đơn theo thời gian (Get Bill Summary)
- **Endpoint**: `/api/bills/summary`
- **Method**: GET
- **Input**: Query parameters `period` (day/month/year), `date` (optional)
- **Output**:
  ```json
  {
    "period": "string (day/month/year)",
    "date": "string",
    "total_bills": "integer",
    "total_amount": "decimal",
    "average_amount": "decimal",
    "payment_methods": [
      {
        "method": "string",
        "count": "integer",
        "amount": "decimal"
      }
    ]
  }
  ```

## 6. API cho Thực khách (Customer Facing)

### 6.1. Lấy thực đơn (Get Menu)
- **Endpoint**: `/api/customer/menu`
- **Method**: GET
- **Input**: Query parameter `table_id`
- **Output**:
  ```json
  {
    "categories": [
      {
        "category_id": "integer",
        "name": "string",
        "items": [
          {
            "item_id": "integer",
            "name": "string",
            "description": "string",
            "price": "decimal",
            "image_url": "string",
            "is_available": "boolean"
          }
        ]
      }
    ],
    "buffet_types": [
      {
        "buffet_type_id": "integer",
        "name": "string",
        "description": "string",
        "price": "decimal",
        "is_available": "boolean"
      }
    ]
  }
  ```

### 6.2. Lấy thông tin đơn hàng hiện tại (Get Current Order)
- **Endpoint**: `/api/customer/tables/{table_id}/current-order`
- **Method**: GET
- **Input**: Path parameter `table_id`
- **Output**:
  ```json
  {
    "order_id": "integer",
    "table_id": "integer",
    "order_type": "string (a_la_carte/buffet)",
    "buffet_name": "string (if applicable)",
    "status": "string",
    "created_at": "timestamp",
    "total_amount": "decimal",
    "items": [
      {
        "item_id": "integer",
        "name": "string",
        "quantity": "integer",
        "status": "string (pending/preparing/ready/served/cancelled)",
        "special_notes": "string",
        "ordered_at": "timestamp"
      }
    ]
  }
  ```

### 6.3. Gọi món (Place Order)
- **Endpoint**: `/api/customer/tables/{table_id}/order-items`
- **Method**: POST
- **Input**:
  ```json
  {
    "item_id": "integer",
    "quantity": "integer",
    "special_notes": "string (optional)"
  }
  ```
- **Output**:
  ```json
  {
    "order_item_id": "integer",
    "order_id": "integer",
    "item_id": "integer",
    "name": "string",
    "quantity": "integer",
    "status": "string (pending)",
    "special_notes": "string",
    "ordered_at": "timestamp"
  }
  ```

### 6.4. Yêu cầu thanh toán (Request Bill)
- **Endpoint**: `/api/customer/tables/{table_id}/request-bill`
- **Method**: POST
- **Input**: Path parameter `table_id`
- **Output**:
  ```json
  {
    "order_id": "integer",
    "table_id": "integer",
    "status": "string (completed)",
    "total_amount": "decimal",
    "message": "string (Bill request has been sent to the waiter)"
  }
  ```
