import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lessonId } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: "lessonId là bắt buộc" },
        { status: 400 }
      );
    }

    // Tìm hoặc tạo LessonProgress cho bài học này
    let progress = await prisma.lessonProgress.findUnique({
      where: { lessonId },
    });

    if (!progress) {
      progress = await prisma.lessonProgress.create({
        data: {
          lessonId,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
    } else {
      progress = await prisma.lessonProgress.update({
        where: { lessonId },
        data: {
          isCompleted: true,
          completedAt: new Date(),
        },
      });
    }

    return NextResponse.json(
      {
        message: "✅ Bài học đã được đánh dấu là hoàn thành",
        progress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật trạng thái bài học:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật trạng thái bài học" },
      { status: 500 }
    );
  }
}
