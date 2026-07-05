export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-20">
      <div className="w-full py-12 px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="font-headline text-2xl font-bold text-primary">MathSign</div>
          <p className="font-body text-base text-on-surface-variant">
            © 2026 MathSign. Kiến tạo hành trình toán học rạng rỡ cho trẻ khiếm thính.
          </p>
        </div>
        <div className="space-y-4">
        </div>
      </div>
    </footer>
  );
}
