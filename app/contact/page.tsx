'use client';

import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const title = formData.get('title') as string;
      const message = formData.get('message') as string;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          title,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }

      setSuccessMessage(data.message || 'Tin nhắn đã được gửi thành công!');
      setIsSuccess(true);
      if (formRef.current) {
        formRef.current.reset();
      }
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 md:px-16 py-12 md:py-20 max-w-7xl mx-auto fade-in">
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
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center shrink-0">
              <Mail className="text-on-primary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Email</h3>
              <p className="font-body text-on-surface-variant">mathsignvietnam8687@gmail.com</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex gap-6 items-start ambient-glow transition-all duration-300">
            <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center shrink-0">
              <Phone className="text-on-secondary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Điện Thoại</h3>
              <p className="font-body text-on-surface-variant">0363578722 (Việt Nam)</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant flex gap-6 items-start ambient-glow transition-all duration-300">
            <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center shrink-0">
              <MapPin className="text-on-tertiary-container" size={24} />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-1">Địa Chỉ</h3>
              <p className="font-body text-on-surface-variant">Đà Nẵng, Việt Nam</p>
            </div>
          </div>
        </aside>

        {/* Contact Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant space-y-6">
          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Tên của bạn</label>
            <input 
              type="text"
              name="name"
              placeholder="Nhập tên..." 
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Email</label>
            <input 
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Tiêu Đề</label>
            <input 
              type="text"
              name="title"
              placeholder="Tiêu đề tin nhắn..." 
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="font-body text-sm font-bold text-on-surface block mb-2">Tin Nhắn</label>
            <textarea 
              name="message"
              placeholder="Viết tin nhắn của bạn..." 
              rows={4}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-outline-variant font-body text-on-surface focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            ></textarea>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-error bg-error/10 p-3 rounded-lg">
              <AlertCircle size={20} />
              <span className="font-body">{error}</span>
            </div>
          )}

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
              <span className="font-body">{successMessage || 'Tin nhắn đã được gửi thành công!'}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
