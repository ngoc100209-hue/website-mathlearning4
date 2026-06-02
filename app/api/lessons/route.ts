import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
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
