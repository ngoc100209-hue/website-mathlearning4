import { ChevronRight, Play, Pause, RotateCcw, Gauge, FilePenLine, Sparkles, Check, Award, Star, Timer } from "lucide-react";
import { Link } from "react-router-dom";

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
            <img 
              alt="Sign Language Instruction" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMu1yvOiwZGSRJnj0kPlNarNBsKV3DpjGa0Vx8V4DHAr_jPbwBhZYkcHFITF6vX3TEwFS8cuwuAXya-nLZ_2EejZxNp7WV_qdxc-OESa8NHewUk45D0GTekDxyStCWVYkPmBEeXiG8xTM0y5FZWLgOBVHPboXfrN2LdrM_qe2pSy5J89Nk0DIRle7ezYxQ-kivdbFS_zD_BsL3i16Vnt3wjFo8hj1t76Kjw3Mw4j12hfUS3TG8M5LfjktnMx98ctk5it0BefPu0S0" 
            />
            {/* Overlay UI */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
              <button className="w-20 h-20 bg-primary-container text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 active:scale-95">
                <Play size={40} className="fill-current ml-2" />
              </button>
            </div>
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Pause className="cursor-pointer" size={24} />
              <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-primary-container w-[45%]"></div>
              </div>
              <span className="font-body text-sm font-semibold tracking-wide">04:12 / 10:00</span>
            </div>
          </div>

          {/* Learning Interaction Tools */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-body text-sm font-semibold flex items-center gap-2 ambient-glow-shadow transition-all active:scale-95">
              <RotateCcw size={20} />
              Xem lại ký hiệu
            </button>
            <button className="bg-surface-container-high text-on-surface px-6 py-3 rounded-xl font-body text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-all active:scale-95">
              <Gauge size={20} />
              Tốc độ: x0.75
            </button>
            <button className="bg-secondary-container text-on-secondary-container md:ml-auto px-6 py-3 rounded-xl font-body text-sm font-semibold flex items-center gap-2 hover:bg-secondary-fixed transition-all active:scale-95">
              <FilePenLine size={20} />
              Ghi chú bài học
            </button>
          </div>
        </div>

        {/* Summary & Details Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Summary Box */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 math-card-border shadow-sm">
            <h3 className="font-headline text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Sparkles />
              Tóm tắt bài học
            </h3>
            <ul className="space-y-4">
              {[
                <>Hiểu khái niệm <strong>gộp</strong> thông qua ký hiệu tay.</>,
                <>Nhận diện các con số từ 1 đến 10 bằng Sign Language.</>,
                <>Cách viết dấu cộng <strong>(+)</strong> và dấu bằng <strong>(=)</strong>.</>,
                <>Thực hành phép cộng cơ bản: <span className="text-primary font-bold">2 + 3 = 5</span>.</>
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <p className="font-body text-base text-on-surface-variant">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Math Highlight Card */}
          <section className="bg-primary-container text-white rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-8 opacity-20 transform group-hover:rotate-12 transition-transform duration-500">
              <span className="font-math text-[160px] leading-none font-bold">+</span>
            </div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-2 opacity-90">Công thức quan trọng</h4>
            <div className="font-math text-5xl font-medium mb-3">5 + 5 = 10</div>
            <p className="font-body text-base opacity-90 relative z-10">Hai bàn tay gộp lại tạo thành mười!</p>
          </section>

          {/* Progress Tracker */}
          <section className="bg-surface-container rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-body text-sm font-bold text-on-surface">Tiến độ khóa học</span>
              <span className="font-body text-sm font-bold text-primary">60%</span>
            </div>
            <div className="w-full h-3 bg-secondary-fixed rounded-full overflow-hidden mb-6">
              <div className="h-full bg-primary-container w-3/5 transition-all duration-1000 ease-out"></div>
            </div>
            <Link to="/practice" className="block w-full text-center py-3 border-2 border-primary text-primary rounded-xl font-body text-sm font-bold hover:bg-primary-fixed transition-colors">
              Tiếp tục bài tập
            </Link>
          </section>
        </div>
      </div>

      {/* Practice Section */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-headline text-4xl font-extrabold text-on-surface">Thử thách cùng MathSign</h2>
          <p className="font-body text-xl text-on-surface-variant">Hãy quan sát bàn tay cô giáo và chọn đáp án đúng cho phép tính dưới đây nhé. Mỗi câu trả lời đúng sẽ giúp bạn thu thập thêm sao!</p>
          <div className="flex gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col items-center flex-1 border border-outline-variant">
              <Award className="text-primary mb-2" size={48} />
              <span className="font-headline text-3xl font-bold">150</span>
              <span className="font-body text-sm font-semibold text-on-surface-variant mt-1">Điểm tích lũy</span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col items-center flex-1 border border-outline-variant">
              <Star className="text-tertiary mb-2 fill-current" size={48} />
              <span className="font-headline text-3xl font-bold">12</span>
              <span className="font-body text-sm font-semibold text-on-surface-variant mt-1">Sao đã nhận</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-md border-2 border-secondary-container relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <span className="font-body text-sm font-bold bg-secondary-fixed px-3 py-1 rounded-full text-on-secondary-fixed tracking-wide">Câu hỏi 1/5</span>
              <Timer className="text-on-surface-variant" size={24} />
            </div>
            
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="w-24 h-24 bg-surface-container flex items-center justify-center rounded-2xl border-2 border-dashed border-primary-fixed overflow-hidden p-1 shadow-sm">
                <img alt="Number 3 Sign" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCliFP5mEaDCqsmZZSP1YgH5Tig4SYhnD2wuDnAJUz_uvHettzYlicKmyVOoXiRbqBit7ydPiVinU5-959DwVc1H0ke6oGx_P88sMy2jcup3skzFyvg1ssspnkdCQ5P-Eu0v1IqrVpD1E2txigKrDSU9IN0Q7MtgfVLMChEgovTB84X55DSTC3-FQeYEfTjvn7bVL0cMOW1ackgSvvYJNdVnpdHORbCjc3BFXjLZ2aux_4u_MFknZqk_9zUx39KwZk7oXPruLC45Fk"/>
              </div>
              <span className="font-math text-4xl font-medium">+</span>
              <div className="w-24 h-24 bg-surface-container flex items-center justify-center rounded-2xl border-2 border-dashed border-primary-fixed overflow-hidden p-1 shadow-sm">
                <img alt="Number 2 Sign" className="w-full h-full object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrnysA571RJwaPfzt-xxj7lpRLu_Ngdxn072WCr49jsjjGhvJrsQBMOjYd8g-7H-rhnjnKrX1jx_8olbuygAPIvMxzdf44hQP8L3sKK3eW8Cq9ydauVmppuZpUxwBhG9KYROX0O_BWxTgTs6r_s7kJ0WfJHy-oJXynRSvICygrDpS5m6dBUOJM_3Ia2zMr-wmIUkI177olEeWTI1am8XzveCILbxslieWyHcBYoXJomZ27eDcRZ41cZvvbwsSam6ZE82JoyhoWqV4"/>
              </div>
              <span className="font-math text-4xl font-medium">= ?</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[4, 5, 6, 3].map(num => (
                <Link to="/practice" key={num} className="block text-center py-6 bg-surface-container-low hover:bg-primary-container hover:text-white transition-all rounded-2xl font-headline text-3xl font-bold border border-outline-variant active:scale-95 text-on-surface">
                  {num}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Subtle background math pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
            <div className="text-[160px] font-bold absolute -top-10 -left-10 leading-none">3+2</div>
            <div className="text-[200px] font-bold absolute bottom-[-40px] -right-10 leading-none">5</div>
          </div>
        </div>
      </section>
    </div>
  );
}
