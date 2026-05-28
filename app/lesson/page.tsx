import { ChevronRight, Play, Pause, RotateCcw, Gauge, FilePenLine, Sparkles, Check, Award, Star, Timer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Lesson() {
  return (
    <div className="px-4 md:px-16 pt-8 pb-20 max-w-[1280px] mx-auto fade-in">
      {/* Breadcrumb & Title Area */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-on-surface-variant mb-4 font-body text-sm font-semibold">
          <span>Toán Lớp 1</span>
          <ChevronRight size={16} />
          <span>Chương 1: Phép Cộng</span>
          <ChevronRight size={16} />
          <span className="text-primary font-bold">Cộng trong phạm vi 10</span>
        </div>
        <h1 className="font-headline text-4xl md:text-[40px] font-extrabold md:leading-[48px] text-on-surface mb-2">Bài 01: Phép cộng trong phạm vi 10</h1>
        <p className="font-body text-base text-on-surface-variant max-w-2xl">Cùng tìm hiểu cách gộp các số lại với nhau bằng ngôn ngữ ký hiệu và các hình ảnh sinh động nhé!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Video Player Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="relative aspect-video bg-inverse-surface rounded-2xl overflow-hidden border-[6px] border-secondary-container shadow-sm group">
            <Image 
              alt="Sign Language Instruction" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMu1yvOiwZGSRJnj0kPlNarNBsKV3DpjGa0Vx8V4DHAr_jPbwBhZYkcHFITF6vX3TEwFS8cuwuAXya-nLZ_2EejZxNp7WV_qdxc-OESa8NHewUk45D0GTekDxyStCWVYkPmBEeXiG8xTM0y5FZWLgOBVHPboXfrN2LdrM_qe2pSy5J89Nk0DIRle7ezYxQ-kivdbFS_zD_BsL3i16Vnt3wjFo8hj1t76Kjw3Mw4j12hfUS3TG8M5LfjktnMx98ctk5it0BefPu0S0" 
              width={800}
              height={600}
            />
            {/* Overlay UI */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
              <button className="flex items-center justify-center w-16 h-16 bg-primary rounded-full hover:bg-primary-container transition-colors shadow-lg">
                <Play className="text-on-primary ml-1" size={28} />
              </button>
            </div>
          </div>

          {/* Video Controls */}
          <div className="flex gap-3 justify-center">
            <button className="p-3 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors">
              <Play size={20} className="text-on-surface" />
            </button>
            <button className="p-3 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors">
              <Pause size={20} className="text-on-surface" />
            </button>
            <button className="p-3 rounded-lg bg-surface-container hover:bg-surface-container-highest transition-colors">
              <RotateCcw size={20} className="text-on-surface" />
            </button>
          </div>

          {/* Content */}
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
            <h2 className="font-headline text-2xl font-bold text-primary">Nội Dung Bài Học</h2>
            <p className="font-body text-on-surface">
              Phép cộng là một phép toán cơ bản giúp chúng ta tìm tổng của hai hoặc nhiều số. Trong bài này, chúng ta sẽ học cách cộng các số trong phạm vi 10 bằng ngôn ngữ ký hiệu.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 items-start">
                <Check className="text-secondary mt-1 flex-shrink-0" size={20} />
                <span className="font-body text-on-surface">Hiểu khái niệm về phép cộng</span>
              </li>
              <li className="flex gap-2 items-start">
                <Check className="text-secondary mt-1 flex-shrink-0" size={20} />
                <span className="font-body text-on-surface">Cộng hai số có tổng không vượt quá 10</span>
              </li>
              <li className="flex gap-2 items-start">
                <Check className="text-secondary mt-1 flex-shrink-0" size={20} />
                <span className="font-body text-on-surface">Sử dụng bảng cộng để tính toán</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Progress Card */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-outline-variant">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="text-primary" size={24} />
              <h3 className="font-headline text-lg font-bold text-on-surface">Tiến Độ</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-sm text-on-surface-variant">Hoàn thành bài học</span>
                  <span className="font-body text-sm font-bold text-primary">45%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Stats */}
          <div className="bg-surface-container-low rounded-2xl p-6 space-y-3">
            <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
              <Star className="text-secondary" size={20} />
              Thống Kê
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-on-surface-variant">Thời gian học</span>
                <span className="font-headline font-bold text-primary">12 phút</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-on-surface-variant">Câu trả lời đúng</span>
                <span className="font-headline font-bold text-primary">8/10</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Link href="/practice" className="bg-primary text-on-primary font-headline font-bold py-3 px-6 rounded-xl text-center hover:brightness-110 transition-all">
              Làm Bài Tập
            </Link>
            <Link href="/" className="bg-surface-container text-on-surface font-headline font-bold py-3 px-6 rounded-xl text-center hover:bg-surface-container-highest transition-all">
              Quay Lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
