import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { BookOpen, CheckCircle2, Lock, Sparkles, UserCircle2 } from 'lucide-react';
import { prisma as db } from '../../lib/prisma';

const parseAge = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isInteger(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number.parseInt(value, 10);
    return Number.isInteger(parsed) ? parsed : null;
  }
  return null;
};

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/auth');
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/auth');
  }

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses?.[0]?.emailAddress ??
    '';
  if (!email) {
    redirect('/auth');
  }

  const unsafeMetadata = (clerkUser.unsafeMetadata ?? {}) as Record<string, unknown>;
  const fullNameRaw = typeof unsafeMetadata?.fullName === 'string' ? unsafeMetadata.fullName.trim() : '';
  const locationRaw = typeof unsafeMetadata?.location === 'string' ? unsafeMetadata.location.trim() : '';
  const fullNameFromClerk = fullNameRaw || [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ').trim() || 'Học sinh';
  const ageFromClerk = parseAge(unsafeMetadata?.age);
  const locationFromClerk = locationRaw || null;

  let profile = await db.userProfile.findUnique({
    where: { clerkId: userId },
  });

  if (!profile) {
    profile = await db.userProfile.create({
      data: {
        clerkId: userId,
        email,
        fullName: fullNameFromClerk === 'Học sinh' ? null : fullNameFromClerk,
        age: ageFromClerk,
        location: locationFromClerk,
      },
    });
  } else {
    const updateData: {
      email?: string;
      fullName?: string | null;
      age?: number | null;
      location?: string | null;
    } = {};

    if (profile.email !== email) updateData.email = email;
    if (profile.fullName !== fullNameFromClerk) {
      updateData.fullName = fullNameFromClerk === 'Học sinh' ? null : fullNameFromClerk;
    }
    if (profile.age !== ageFromClerk) updateData.age = ageFromClerk;
    if (profile.location !== locationFromClerk) updateData.location = locationFromClerk;

    if (Object.keys(updateData).length > 0) {
      profile = await db.userProfile.update({
        where: { id: profile.id },
        data: updateData,
      });
    }
  }

  const showWelcomeBanner = profile.isNew;
  if (showWelcomeBanner) {
    await db.userProfile.update({
      where: { id: profile.id },
      data: { isNew: false },
    });
  }

  const lessons = await db.lesson.findMany({
    orderBy: { order: 'asc' },
    include: {
      progress: {
        where: { userId: profile.id },
      },
    },
  });

  const progress = Array.isArray(lessons)
    ? lessons.map((lesson) => {
        const progressList = Array.isArray(lesson?.progress) ? lesson.progress : [];
        const lessonProgress = progressList?.[0];
        const isCompleted = lessonProgress?.isCompleted === true;
        return {
          id: lesson.id,
          title: lesson.title,
          isCompleted,
        };
      })
    : [];

  const completedCount = progress.filter((item) => item.isCompleted).length;
  const totalCount = progress.length || 1;
  const percent = Math.round((completedCount / totalCount) * 100);
  const displayName = profile.fullName ?? fullNameFromClerk;

  return (
    <div className="px-4 py-10 md:px-16 md:py-16">
      <div className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary-container p-4 text-primary">
              <UserCircle2 size={36} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Hồ sơ cá nhân</p>
              <h1 className="text-3xl font-bold text-on-surface">{displayName}</h1>
              <p className="text-sm text-on-surface-variant">Email: {profile.email}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface-variant">
            {showWelcomeBanner ? (
              <span className="font-semibold text-primary">🎉 Chào mừng bạn! Bạn đã đăng ký tài khoản thành công.</span>
            ) : (
              <span className="font-semibold text-primary">
                👋 Chào mừng bạn quay trở lại học toán, {displayName}!
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div id="learning-progress" className="rounded-3xl border border-outline-variant bg-surface p-6 shadow-sm scroll-mt-24">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={20} />
              <h2 className="text-xl font-semibold">Tiến độ học tập của em</h2>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-container-high">
              <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-on-surface-variant">
              <span>Đã hoàn thành {completedCount}/{totalCount} mục</span>
              <span>{percent}%</span>
            </div>

            <div className="mt-6 space-y-3">
              {progress.length ? (
                progress.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl border border-outline-variant bg-surface-container-lowest px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <BookOpen size={18} className="text-primary" />
                      <span className="font-medium text-on-surface">{item.title}</span>
                    </div>
                    {item.isCompleted ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        🎉 Đã hoàn thành
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                        ⏳ Chưa hoàn thành
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-outline-variant p-4 text-sm text-on-surface-variant">
                  Chưa có tiến độ nào được lưu. Hãy học bài đầu tiên để bắt đầu.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-outline-variant bg-surface p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-on-surface">Thông tin cơ bản</h2>
              <div className="mt-4 space-y-3 text-sm text-on-surface-variant">
                <div className="flex items-center justify-between gap-3">
                  <span>Tên</span>
                  <span className="font-semibold text-on-surface text-right">{displayName}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Tuổi</span>
                  <span className="font-semibold text-on-surface">{profile.age ?? 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Khu vực</span>
                  <span className="font-semibold text-on-surface">{profile.location ?? 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Email</span>
                  <span className="font-semibold text-on-surface text-right">{profile.email}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Mật khẩu</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-3 py-1 font-semibold text-on-surface">
                    <Lock size={14} /> ••••••••
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Trạng thái</span>
                  <span className="font-semibold text-primary">Đã đăng nhập</span>
                </div>
              </div>
            </div>

            <Link href="/lessons" className="flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:brightness-110">
              Tiếp tục học
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
