import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const lessons = await prisma.lesson.findMany({
      orderBy: { order: 'asc' },
      include: { progress: { where: { userId: profile.id } } },
    });

    const progress = lessons.map((lesson: (typeof lessons)[number]) => ({
      id: lesson.id,
      title: lesson.title,
      isCompleted: Boolean(lesson.progress?.[0]?.isCompleted),
    }));

    return NextResponse.json({
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.fullName ?? user.firstName ?? 'Học sinh',
        age: profile.age,
        location: profile.location,
      },
      progress,
    });
  } catch (error) {
    console.error('Profile API error', error);
    return NextResponse.json({ error: 'Unable to load profile' }, { status: 500 });
  }
}
