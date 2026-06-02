# Setup Hướng Dẫn - Contact Form với Prisma ORM

## Các bước cài đặt

### 1. Cài đặt Dependencies
Chạy lệnh sau để cài đặt Prisma:
```bash
npm install @prisma/client prisma
```

Hoặc chạy script batch (Windows):
```bash
setup-db.bat
```

### 2. Tạo Supabase Database
1. Truy cập [Supabase](https://supabase.com)
2. Tạo một project mới
3. Vào **Settings > Database** để lấy connection string
4. Sao chép connection string

### 3. Cấu hình Environment Variables
Cập nhật file `.env.local`:
```env
# Lấy từ Supabase Dashboard > Settings > Database
DATABASE_URL="postgresql://postgres.xxxxx:password@db.xxxxx.supabase.co:5432/postgres?schema=public"
DIRECT_URL="postgresql://postgres.xxxxx:password@db.xxxxx.supabase.co:5432/postgres?schema=public"
```

**Lưu ý**: 
- `DATABASE_URL`: Cho connection pooling (mặc định)
- `DIRECT_URL`: Cho migrations (Prisma)

### 4. Chạy Database Migrations
```bash
npx prisma migrate dev --name init
```

Lệnh này sẽ:
- Tạo bảng `Contact` trong database
- Tạo file migration trong folder `prisma/migrations`

### 5. Tạo Prisma Client
```bash
npx prisma generate
```

### 6. Chạy Application
```bash
npm run dev
```

Truy cập: `http://localhost:3000/contact`

## Cấu trúc Database

Bảng `Contact` có các trường:
- `id`: Int (Primary Key, Auto-increment)
- `name`: String (Tên liên hệ)
- `email`: String (Email)
- `title`: String (Tiêu đề)
- `message`: Text (Nội dung tin nhắn)
- `createdAt`: DateTime (Thời gian tạo)
- `updatedAt`: DateTime (Thời gian cập nhật)

## API Endpoint

### POST /api/contact
Gửi tin nhắn liên hệ

**Request Body:**
```json
{
  "name": "Tên người dùng",
  "email": "user@example.com",
  "title": "Tiêu đề",
  "message": "Nội dung tin nhắn"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Tin nhắn đã được gửi thành công!",
  "contact": {
    "id": 1,
    "name": "...",
    "email": "...",
    "title": "...",
    "message": "...",
    "createdAt": "2024-05-29T...",
    "updatedAt": "2024-05-29T..."
  }
}
```

### GET /api/contact
Lấy danh sách các tin nhắn liên hệ (50 tin nhắn gần nhất)

## Troubleshooting

### Lỗi: "Can't reach database server"
- Kiểm tra connection string trong `.env.local`
- Đảm bảo IP của máy được thêm vào Supabase whitelist
- Thử restart development server

### Lỗi: "Prisma Client not found"
```bash
npx prisma generate
```

### Xóa và tạo lại database
```bash
npx prisma migrate reset
```
**⚠️ Cảnh báo**: Lệnh này sẽ xóa toàn bộ dữ liệu!

## Thêm Migration sau này
Khi cần thay đổi schema:
```bash
# Chỉnh sửa file prisma/schema.prisma
npx prisma migrate dev --name description_of_changes
```

## Xem dữ liệu trong Supabase UI
1. Truy cập Supabase Dashboard
2. Vào **Table Editor**
3. Chọn bảng `Contact`
