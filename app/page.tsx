import { GraduationCap, FilePenLine, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  const startHref = userId ? "/profile" : "/auth";
  const achievementHref = userId
    ? "/profile#learning-progress"
    : "/auth?redirect_url=/profile%23learning-progress";

  return (
    <div className="px-4 md:px-16 w-full fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col items-center text-center">
        <div className="max-w-200 space-y-6">
          <h1 className="font-headline text-5xl md:text-6xl text-primary font-extrabold leading-tight tracking-tight">
            CHÀO MỪNG CÁC EM ĐẾN VỚI TOÁN HỌC!
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-150 mx-auto">
            Kiến tạo hành trình toán học rạng rỡ và dễ hiểu qua ngôn ngữ ký hiệu dành riêng cho các thiên thần nhỏ.
          </p>
          <div className="pt-4">
            <Link href={startHref} className="press-effect inline-block bg-primary-container text-white px-12 py-3 rounded-2xl font-headline text-2xl font-bold shadow-lg hover:brightness-105 transition-all">
              Bắt đầu ngay
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-20">
          <Link href="/lessons" className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center ambient-glow transition-all duration-300 group cursor-pointer hover:shadow-lg">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-on-secondary-container" size={32} />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Học Bài Mới</h3>
            <p className="font-body text-base text-on-surface-variant">Khám phá các con số qua video ký hiệu</p>
          </Link>

          <Link href="/practice" className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center ambient-glow transition-all duration-300 group cursor-pointer hover:shadow-lg">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FilePenLine className="text-on-secondary-container" size={32} />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Làm Bài Tập</h3>
            <p className="font-body text-base text-on-surface-variant">Luyện tập kỹ năng với trò chơi vui nhộn</p>
          </Link>

          <Link href={achievementHref} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center ambient-glow transition-all duration-300 group cursor-pointer hover:shadow-lg">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="text-on-primary-fixed" size={32} />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Thành Tích</h3>
            <p className="font-body text-base text-on-surface-variant">Theo dõi tiến độ học tập của bạn</p>
          </Link>
        </div>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="flex flex-col items-center text-center space-y-3">
            <CheckCircle2 className="text-secondary" size={48} />
            <h3 className="font-headline text-2xl font-bold text-on-surface">Dễ Hiểu</h3>
            <p className="font-body text-on-surface-variant">Thiết kế đơn giản, thân thiện cho trẻ em</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <CheckCircle2 className="text-secondary" size={48} />
            <h3 className="font-headline text-2xl font-bold text-on-surface">Tương Tác</h3>
            <p className="font-body text-on-surface-variant">Học qua trò chơi và hoạt động vui vẻ</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <CheckCircle2 className="text-secondary" size={48} />
            <h3 className="font-headline text-2xl font-bold text-on-surface">Hiệu Quả</h3>
            <p className="font-body text-on-surface-variant">Phương pháp chứng minh hiệu quả</p>
          </div>
        </section>
      </section>
    </div>
  );
}
