import { GraduationCap, Languages, FilePenLine, Info, Star, CheckCircle2, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="px-4 md:px-16 w-full fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col items-center text-center">
        <div className="max-w-[800px] space-y-6">
          <h1 className="font-headline text-5xl md:text-6xl text-primary font-extrabold leading-tight tracking-tight">
            CHÀO MỪNG CÁC CON ĐẾN VỚI TOÁN HỌC!
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-[600px] mx-auto">
            Kiến tạo hành trình toán học rạng rỡ và dễ hiểu qua ngôn ngữ ký hiệu dành riêng cho các thiên thần nhỏ.
          </p>
          <div className="pt-4">
            <Link to="/lesson" className="press-effect inline-block bg-primary-container text-white px-12 py-3 rounded-xl font-headline text-2xl font-bold shadow-sm hover:brightness-105 transition-all">
              Bắt đầu học ngay
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-20">
          <Link to="/lesson" className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center ambient-glow transition-all duration-300 group cursor-pointer hover:shadow-lg">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-on-secondary-container" size={32} />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Học Bài Mới</h3>
            <p className="font-body text-base text-on-surface-variant">Khám phá các con số qua video ký hiệu</p>
          </Link>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center ambient-glow transition-all duration-300 group cursor-pointer hover:shadow-lg">
            <div className="w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Languages className="text-on-tertiary" size={32} />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Học Từ Vựng</h3>
            <p className="font-body text-base text-on-surface-variant">Tra cứu từ vựng toán học trực quan</p>
          </div>

          <Link to="/practice" className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center ambient-glow transition-all duration-300 group cursor-pointer hover:shadow-lg">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FilePenLine className="text-on-secondary-container" size={32} />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Làm Bài Tập</h3>
            <p className="font-body text-base text-on-surface-variant">Luyện tập kỹ năng với trò chơi vui nhộn</p>
          </Link>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center text-center ambient-glow transition-all duration-300 group cursor-pointer hover:shadow-lg">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Info className="text-primary" size={32} />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Giới Thiệu</h3>
            <p className="font-body text-base text-on-surface-variant">Tìm hiểu về sứ mệnh của MathSign</p>
          </div>
        </div>
      </section>

      {/* Feature Spotlight */}
      <section className="py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-2xl p-8 md:p-12 border border-outline-variant shadow-sm overflow-hidden">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary-container px-4 py-1 rounded-full">
              <Star className="text-on-secondary-container w-4 h-4 fill-current" />
              <span className="font-body font-semibold text-sm text-on-secondary-container">NỔI BẬT</span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-on-background">Học Toán Qua Video Ngôn Ngữ Ký Hiệu</h2>
            <p className="font-body text-xl text-on-surface-variant">
              Mỗi khái niệm toán học đều đi kèm với video hướng dẫn bằng ngôn ngữ ký hiệu chất lượng cao, giúp trẻ dễ dàng nắm bắt logic mà không gặp rào cản ngôn ngữ.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                <span className="font-body text-base">Hình ảnh minh họa rạng rỡ, sinh động.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                <span className="font-body text-base">Tốc độ video có thể điều chỉnh linh hoạt.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                <span className="font-body text-base">Giáo trình chuẩn sư phạm chuyên biệt.</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full aspect-video rounded-xl overflow-hidden border-4 border-secondary-container bg-surface-container relative">
            <img 
              alt="Học toán qua video" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSZPQH4hdGiHn6p_4UayVbDvhlYIALkpT7Rr1Ah20B0GkbTwL4m4lcwDRCjfA1HrI6aupTz_vQ6f3zHI8a4yDWuhPptUGYm175OgxwDSDaA2NyLe7kidcDiJvmpqtMs_X3E3dQZrE2MIHClpp3vhjkKS_nh64fRQM2fgRfHY7v1FQM2cDKNuy1E66n9_BwLw8aCtRslAlBlinRPGPxAuN3mZXPPWa823HPfrYCtTBtYMQI7fiFbzqNwHsyqblZ5590UxkND8MzAtk"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer hover:bg-black/10 transition-colors duration-300">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center press-effect hover:scale-105 transition-transform duration-200">
                <Play className="text-primary fill-current" size={32} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 grid grid-cols-2 lg:grid-cols-4 gap-6 border-y border-outline-variant">
        <div className="text-center py-2">
          <p className="font-headline text-5xl font-extrabold text-primary mb-2">1000+</p>
          <p className="font-body text-sm font-semibold text-on-surface-variant tracking-wider uppercase">BÀI TẬP</p>
        </div>
        <div className="text-center py-2">
          <p className="font-headline text-5xl font-extrabold text-primary mb-2">500+</p>
          <p className="font-body text-sm font-semibold text-on-surface-variant tracking-wider uppercase">VIDEO KÝ HIỆU</p>
        </div>
        <div className="text-center py-2">
          <p className="font-headline text-5xl font-extrabold text-primary mb-2">50+</p>
          <p className="font-body text-sm font-semibold text-on-surface-variant tracking-wider uppercase">CHỦ ĐỀ HỌC TẬP</p>
        </div>
        <div className="text-center py-2">
          <p className="font-headline text-5xl font-extrabold text-primary mb-2">10k+</p>
          <p className="font-body text-sm font-semibold text-on-surface-variant tracking-wider uppercase">HỌC VIÊN NHÍ</p>
        </div>
      </section>
    </div>
  );
}
