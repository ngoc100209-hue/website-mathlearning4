import { PrismaClient } from "@prisma/client";

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
      videoUrl: "https://www.youtube.com/embed/fHraqYZ8itA",
      order: 1,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: "NHẬN BIẾT HÌNH HỌC",
      videoUrl: "https://www.youtube.com/embed/0gwOND9Yqis",
      order: 2,
    },
  });

  // Tạo progress cho các bài học
  await prisma.lessonProgress.create({
    data: {
      lessonId: lesson1.id,
      isCompleted: false,
    },
  });

  await prisma.lessonProgress.create({
    data: {
      lessonId: lesson2.id,
      isCompleted: false,
    },
  });

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
