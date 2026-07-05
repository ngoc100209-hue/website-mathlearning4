import { PrismaClient } from "@prisma/client";
import process from "node:process";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu seeding database...");

  // Xóa dữ liệu cũ (nếu có)
  await prisma.lessonProgress.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.lesson.deleteMany({});

  // Tạo 2 bài học mẫu
  const lesson1 = await prisma.lesson.create({
    data: {
      title: "NHẬN BIẾT KÍ HIỆU TOÁN HỌC",
      videoUrl: "https://www.youtube.com/embed//fUQ7ECd-2T4",
      order: 1,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: "NHẬN BIẾT SỐ ĐẾM",
      videoUrl: "https://www.youtube.com/embed/ZIz1CDem8vU",
      order: 2,
    },
  });

  // Progress sẽ được tạo theo từng học sinh khi các em hoàn thành bài học.

  console.log("✅ Seeding hoàn thành!");
  console.log("📚 Bài học 1:", lesson1);
  console.log("📚 Bài học 2:", lesson2);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Lỗi khi seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
