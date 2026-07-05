import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server';

interface LessonProgress {
  isCompleted?: boolean;
  completedAt?: Date | null;
}

interface Lesson {
  progress: LessonProgress[];
}

interface LessonWithProgress extends Lesson {
  isCompleted: boolean;
  completedAt: Date | null;
}

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const lessons: Lesson[] = await prisma.lesson.findMany({
      orderBy: {
        order: "asc",
      },
      include: {
        progress: {
          where: { userId: profile.id },
        },
      },
    });

    const lessonsWithProgress: LessonWithProgress[] = lessons.map((lesson) => ({
      ...lesson,
      isCompleted: lesson.progress[0]?.isCompleted || false,
      completedAt: lesson.progress[0]?.completedAt || null,
    }));

    return NextResponse.json(lessonsWithProgress, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách bài học:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách bài học" },
      { status: 500 }
    );
  }
}
