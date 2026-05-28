'use client';

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
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="text-on-primary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Email</h3>
              <p className="font-body text-on-surface-variant">contact@mathsign.edu.vn</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex gap-6 items-start ambient-glow transition-all duration-300">
            <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="text-on-secondary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Điện Thoại</h3>
              <p className="font-body text-on-surface-variant">+84 (0) 123 456 789</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex gap-6 items-start ambient-glow transition-all duration-300">
            <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="text-on-tertiary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Địa Chỉ</h3>
              <p className="font-body text-on-surface-variant">Hà Nội, Việt Nam</p>
            </div>
          </div>
        </aside>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant space-y-6">
          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Tên của bạn</label>
            <input 
              type="text" 
              placeholder="Nhập tên..." 
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Email</label>
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Tiêu Đề</label>
            <input 
              type="text" 
              placeholder="Tiêu đề tin nhắn..." 
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Tin Nhắn</label>
            <textarea 
              placeholder="Viết tin nhắn của bạn..." 
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-on-primary font-headline font-bold py-3 px-6 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Đang gửi...
              </>
            ) : (
              <>
                <Send size={20} />
                Gửi Tin Nhắn
              </>
            )}
          </button>

          {isSuccess && (
            <div className="flex items-center gap-2 text-secondary bg-secondary/10 p-3 rounded-lg">
              <CheckCircle2 size={20} />
              <span className="font-body">Tin nhắn đã được gửi thành công!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
