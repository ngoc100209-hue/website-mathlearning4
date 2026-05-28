export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-20">
      <div className="w-full py-12 px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1280px] mx-auto">
        <div className="space-y-4">
          <div className="font-headline text-2xl font-bold text-primary">MathSign</div>
          <p className="font-body text-base text-on-surface-variant">
            © 2024 MathSign. Kiến tạo hành trình toán học rạng rỡ cho trẻ khiếm thính.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-body text-sm font-bold text-primary">Khám Phá</h4>
          <nav className="flex flex-col gap-2">
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Bài Học Mới</a>
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Trò Chơi</a>
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Từ Vựng</a>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="font-body text-sm font-bold text-primary">Về Chúng Tôi</h4>
          <nav className="flex flex-col gap-2">
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Sứ Mệnh</a>
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Đội Ngũ</a>
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Liên Hệ</a>
          </nav>
        </div>
        <div className="space-y-4">
          <h4 className="font-body text-sm font-bold text-primary">Pháp Lý</h4>
          <nav className="flex flex-col gap-2">
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Điều Khoản</a>
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Bảo Mật</a>
            <a href="#" className="font-body text-base text-on-surface-variant hover:text-primary transition-colors">Cookies</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
