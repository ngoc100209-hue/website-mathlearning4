import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="px-4 md:px-16 py-12 md:py-20 max-w-[1280px] mx-auto fade-in">
      <section className="mb-20 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Kết Nối Với Chúng Tôi</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-body text-xl">
          Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ hành trình học tập của bạn. Hãy gửi tin nhắn cho MathSign nhé!
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Sidebar */}
        <aside className="lg:col-span-5 grid grid-cols-1 gap-6">
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex gap-6 items-start ambient-glow transition-all duration-300">
            <div className="bg-secondary-container p-3 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="text-on-secondary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-2">Địa Chỉ</h3>
              <p className="text-on-surface font-body text-base">
                123 Đường Sáng Tạo, Quận Bình Thạnh,<br/>Thành phố Hồ Chí Minh, Việt Nam
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex gap-6 items-start ambient-glow transition-all duration-300">
            <div className="bg-secondary-container p-3 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="text-on-secondary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-2">Email</h3>
              <p className="text-on-surface font-body text-base">lienhe@mathsign.edu.vn<br/>support@mathsign.edu.vn</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex gap-6 items-start ambient-glow transition-all duration-300">
            <div className="bg-secondary-container p-3 rounded-lg flex items-center justify-center shrink-0">
              <Phone className="text-on-secondary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-2">Hotline & Zalo</h3>
              <p className="text-on-surface font-body text-base">+84 901 234 567<br/>Thứ 2 - Thứ 7 (8:00 - 17:00)</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl h-48 group">
            <img 
              alt="Deaf child learning math" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxX7Z6bDMTKIQchXlcu3GRPbHRIpBCmHwMbIhN4VC2zuSjV-PMwQxmORro2_kCrbA4pepp6ZSr9YfSDKp6nF8oizgFzRg2SLgO24xL795OOkSEv1Dg1iR2KZJEzLRVJKoEQ4JGE-uFNYArsApryXuW-cNPVXnfVYLFdgo2ELDUgTSc9YkVIiWwfBgEHIdycv0WfbpzNy6TaIQkC2_pMaHgYQ1XrfKC20tFMyPPk9teJwnc-yf8QeU4_2Mmi9a5NYcr9nsWsDolnz8" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
              <p className="text-white font-body text-sm font-semibold tracking-wide">Hỗ trợ cộng đồng khiếm thính</p>
            </div>
          </div>
        </aside>

        {/* Contact Form */}
        <section className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-2xl border border-outline-variant shadow-sm">
          <div className="mb-8">
            <h2 className="font-headline text-3xl font-extrabold text-primary mb-2">Gửi Tin Nhắn</h2>
            <p className="text-on-surface-variant font-body text-base">Điền thông tin bên dưới và chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-body text-sm font-semibold text-on-surface-variant px-1" htmlFor="name">Họ và Tên</label>
                <input required className="h-14 px-4 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary/20 transition-all font-body text-base" id="name" placeholder="Nguyễn Văn A" type="text"/>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-body text-sm font-semibold text-on-surface-variant px-1" htmlFor="email">Email</label>
                <input required className="h-14 px-4 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary/20 transition-all font-body text-base" id="email" placeholder="email@vi-du.com" type="email"/>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-semibold text-on-surface-variant px-1" htmlFor="subject">Chủ Đề</label>
              <select className="h-14 px-4 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary/20 transition-all font-body text-base appearance-none" id="subject">
                <option>Tư vấn khóa học</option>
                <option>Hỗ trợ kỹ thuật</option>
                <option>Hợp tác giáo dục</option>
                <option>Khác</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="font-body text-sm font-semibold text-on-surface-variant px-1" htmlFor="message">Nội Dung</label>
              <textarea required className="p-4 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary/20 transition-all font-body text-base resize-none" id="message" placeholder="Bạn cần chúng tôi giúp gì?" rows={5}></textarea>
            </div>
            
            <div className="pt-4">
              <button 
                disabled={isSubmitting || isSuccess}
                className={`w-full md:w-auto px-10 h-14 font-headline text-xl font-bold rounded-full transition-all duration-200 flex items-center justify-center gap-2 press-effect ${
                  isSuccess ? "bg-tertiary-container text-on-tertiary-container cursor-default" : "bg-primary-container text-on-primary-container hover:shadow-lg"
                }`} 
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Đang gửi...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 /> Đã gửi thành công!
                  </>
                ) : (
                  <>
                    <span>Gửi Yêu Cầu</span>
                    <Send />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>

      <section className="mt-20 py-12 border-t border-outline-variant">
        <h2 className="font-headline text-3xl font-extrabold text-primary text-center mb-12">Câu Hỏi Thường Gặp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-secondary-container/20 rounded-xl">
            <p className="font-body text-sm font-semibold text-on-secondary-container mb-2">Cần hỗ trợ gấp về kỹ thuật?</p>
            <p className="font-body text-base text-on-surface-variant">Hãy nhắn tin trực tiếp qua Zalo để được hỗ trợ trong 15 phút.</p>
          </div>
          <div className="p-6 bg-secondary-container/20 rounded-xl">
            <p className="font-body text-sm font-semibold text-on-secondary-container mb-2">Thời gian phản hồi email?</p>
            <p className="font-body text-base text-on-surface-variant">Chúng tôi cam kết trả lời mọi thắc mắc qua email trong vòng 24 giờ làm việc.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
