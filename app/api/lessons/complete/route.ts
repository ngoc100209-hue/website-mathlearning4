import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let profile = await prisma.userProfile.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!profile) {
      const user = await currentUser();
      const email =
        user?.primaryEmailAddress?.emailAddress ??
        user?.emailAddresses?.[0]?.emailAddress;

      if (!user || !email) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
      }

      const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || null;
      const createdProfile = await prisma.userProfile.create({
        data: {
          clerkId,
          email,
          fullName,
          isNew: false,
        },
        select: { id: true },
      });

      profile = createdProfile;
    }

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
      where: {
        lessonId_userId: {
          lessonId,
          userId: profile.id,
        },
      },
    });

    if (!progress) {
      progress = await prisma.lessonProgress.create({
        data: {
          lessonId,
          userId: profile.id,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
    } else {
      progress = await prisma.lessonProgress.update({
        where: {
          lessonId_userId: {
            lessonId,
            userId: profile.id,
          },
        },
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
