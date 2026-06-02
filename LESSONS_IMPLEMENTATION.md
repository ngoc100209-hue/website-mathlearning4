# 📚 Hướng Dẫn Xây Dựng Tính Năng Bài Học - Toán Học

Toàn bộ cấu trúc cơ sở dữ liệu, API routes, và giao diện đã được xây dựng hoàn chỉnh. Hãy làm theo các bước dưới đây để triển khai thành công:

## ✅ Bước 1: Cập Nhật Schema Prisma

**File đã được cập nhật:** `prisma/schema.prisma`

Các thay đổi:
- ✓ Model `Lesson` đã được sửa (thêm field `order`, sửa kiểu `title` và `videoUrl`)
- ✓ Model `LessonProgress` đã được thêm vào

## ✅ Bước 2: Tạo Dữ Liệu Mẫu (Seed)

**File đã được tạo:** `prisma/seed.ts`
**File đã được cập nhật:** `package.json` (thêm script `db:seed`)

Dữ liệu mẫu:
- Bài 1: "Khái niệm về Đạo hàm" 
- Bài 2: "Các công thức tính Đạo hàm cơ bản"

## ✅ Bước 3: API Routes Đã Được Tạo

### GET `/api/lessons`
**File:** `app/api/lessons/route.ts`
- Lấy danh sách bài học theo thứ tự
- Trả về trạng thái hoàn thành của mỗi bài

### POST `/api/lessons/complete`
**File:** `app/api/lessons/complete/route.ts`
- Cập nhật trạng thái bài học thành `isCompleted = true`
- Tự động tạo record LessonProgress nếu chưa tồn tại

## ✅ Bước 4: Giao Diện Đã Được Tạo

### Client Component (Tương Tác)
**File:** `components/LessonsClient.tsx`

Tính năng:
- ✓ Danh sách bài học bên trái với icon check khi hoàn thành
- ✓ Trình phát video YouTube bên phải (iframe)
- ✓ Nút "Nhấn để hoàn thành" với hiệu ứng loading
- ✓ Tự động chuyển sang bài tiếp theo sau 1 giây
- ✓ Thanh tiến độ hiển thị tổng số bài hoàn thành
- ✓ Responsive design với Tailwind CSS
- ✓ Icons từ Lucide React

### Server Component (Fetch Data)
**File:** `app/lessons/page.tsx`
- Lấy dữ liệu bài học từ Prisma
- Render Client Component với dữ liệu ban đầu

### Navigation Update
**File:** `components/Navigation.tsx`
- Link "Bài Học" đã được cập nhật để trỏ đến `/lessons`

---

## 🚀 Các Bước Triển Khai Cuối Cùng

### 1️⃣ Cập Nhật Database Schema

```bash
npm run db:push
```

Điều này sẽ đồng bộ schema mới với Supabase.

### 2️⃣ Chạy Seed Script Để Tạo Dữ Liệu Mẫu

```bash
npm run db:seed
```

Hoặc nếu bạn muốn sử dụng `npx`:
```bash
npx prisma db seed
```

Dữ liệu mẫu sẽ được tạo tự động.

### 3️⃣ (Tùy chọn) Xem Dữ Liệu Trong Prisma Studio

```bash
npm run db:studio
```

Mở giao diện web để quản lý dữ liệu.

### 4️⃣ Chạy Dev Server

```bash
npm run dev
```

### 5️⃣ Truy Cập Trang Bài Học

Mở trình duyệt và truy cập:
```
http://localhost:3000/lessons
```

---

## 📊 Cấu Trúc Dữ Liệu

### Model Lesson
```prisma
{
  id: String (UUID)
  title: String (Tiêu đề bài học)
  videoUrl: String (URL video YouTube)
  order: Int (Thứ tự bài học)
  createdAt: DateTime
  updatedAt: DateTime
  progress: LessonProgress[] (Quan hệ)
  questions: Question[] (Quan hệ)
}
```

### Model LessonProgress
```prisma
{
  id: String (UUID)
  lessonId: String (FK)
  lesson: Lesson (Quan hệ)
  isCompleted: Boolean (Trạng thái hoàn thành)
  completedAt: DateTime (Thời gian hoàn thành)
  updatedAt: DateTime
}
```

---

## 🎨 Giao Diện Tính Năng

### Layout
- **Sidebar (25%)**: Danh sách bài học với checkbox/icon check
- **Content Area (75%)**: Video player và nút hoàn thành

### Màu Sắc
- Indigo-600: Màu chính
- Green-500: Nút hoàn thành
- Gray-900 to Gray-50: Hierarchy

### Responsive
- Mobile: Stack layout (content under sidebar)
- Tablet/Desktop: Side-by-side layout (grid-cols-4 & lg:col-span-3)

---

## 🔧 Tùy Chỉnh URL Video YouTube

Để thay đổi video cho mỗi bài học, chỉnh sửa file `prisma/seed.ts`:

```typescript
const lesson1 = await prisma.lesson.create({
  data: {
    title: "Khái niệm về Đạo hàm",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", // ← Thay VIDEO_ID
    order: 1,
  },
});
```

**Lưu ý:** Hãy sử dụng URL dạng `https://www.youtube.com/embed/VIDEO_ID` (không phải `youtube.com/watch?v=`)

---

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Không thể kết nối đến database"
- Kiểm tra biến `DATABASE_URL` và `DIRECT_URL` trong `.env.local`
- Đảm bảo URL đúng định dạng PostgreSQL

### Lỗi: "Module not found: Prisma"
- Chạy: `npm install`
- Sau đó: `npm run db:generate`

### Lỗi: "Invalid field or attribute definition"
- Kiểm tra lại file `schema.prisma` để đảm bảo không có lỗi cú pháp

### Giao diện không hiển thị video
- Kiểm tra URL video có đúng format `youtube.com/embed/...` không
- Đảm bảo video YouTube đã publish công khai

---

## 📝 Tiếp Theo Có Thể Làm

1. **Thêm tính năng câu hỏi**: Tạo giao diện quiz sau video
2. **Hệ thống người dùng**: Lưu tiến độ học của từng người dùng
3. **Chứng chỉ**: Cấp chứng chỉ khi hoàn thành tất cả bài
4. **Bình luận/Hỏi đáp**: Thêm khu vực thảo luận dưới mỗi bài
5. **Tracking analytics**: Theo dõi thời gian xem, tỷ lệ hoàn thành

---

## ✨ Lưu Ý Quan Trọng

- **Trạng thái hoàn thành được lưu trong database** - không sử dụng localStorage
- **Tính năng đồng bộ tự động** - khi hoàn thành 1 bài, sidebar sẽ cập nhật ngay lập tức
- **Chuyển bài tự động** - sau 1 giây hoàn thành, trang sẽ chuyển sang bài tiếp theo
- **Responsive design** - hoạt động tốt trên mobile, tablet, và desktop

---

**🎉 Hoàn tất! Hệ thống bài học của bạn đã sẵn sàng để sử dụng.**
