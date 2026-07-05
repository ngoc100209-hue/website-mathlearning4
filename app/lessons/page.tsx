import LessonsClient from "@/components/LessonsClient";
import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Bài Học | Toán Học",
  description: "Khóa học toán trực tuyến với bài giảng video chất lượng cao",
};

async function getLessons() {
  try {
    let clerkId: string | null = null;
    try {
      const authResult = await auth();
      clerkId = authResult.userId;
    } catch (authError) {
      // If Clerk auth context is unavailable, still render public lesson list.
      console.warn("⚠️ Không thể lấy phiên đăng nhập, tiếp tục tải danh sách bài học công khai:", authError);
    }

    const profile = clerkId
      ? await prisma.userProfile.findUnique({
          where: { clerkId },
          select: { id: true },
        })
      : null;

    const lessons = await prisma.lesson.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        progress: profile
          ? {
              where: { userId: profile.id },
            }
          : true,
      },
    });

    const lessonsWithProgress = lessons.map((lesson: (typeof lessons)[number]) => ({
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
