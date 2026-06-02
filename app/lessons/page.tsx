import LessonsClient from "@/components/LessonsClient";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Bài Học | Toán Học",
  description: "Khóa học toán trực tuyến với bài giảng video chất lượng cao",
};

async function getLessons() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        progress: true,
      },
    });

    const lessonsWithProgress = lessons.map((lesson) => ({
      ...lesson,
      isCompleted: lesson.progress[0]?.isCompleted || false,
      completedAt: lesson.progress[0]?.completedAt
        ? lesson.progress[0].completedAt.toISOString()
        : null,
    }));

    return lessonsWithProgress;
  } catch (error) {
    console.error("❌ Lỗi khi lấy dữ liệu bài học:", error);
    return [];
  }
}

export default async function LessonsPage() {
  const lessons = await getLessons();

  return (
    <div>
      <LessonsClient initialLessons={lessons} />
    </div>
  );
}
