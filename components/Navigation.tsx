import Link from "next/link";

export default function Navigation() {
  const getNavLinkClass = (href: string) =>
    href === "/"
      ? "text-primary border-b-2 border-primary font-bold pb-1 font-body text-sm transition-colors duration-200"
      : "text-on-surface-variant font-medium font-body text-sm transition-colors duration-200 hover:text-primary-container";

  return (
    <nav className="hidden md:flex gap-6 items-center">
      <Link href="/" className={getNavLinkClass("/")}>Trang Chủ</Link>
      <Link href="/lessons" className={getNavLinkClass("/lessons")}>Bài Học</Link>
      <Link href="/practice" className={getNavLinkClass("/practice")}>Ôn Tập</Link>
      <Link href="/contact" className={getNavLinkClass("/contact")}>Liên Hệ</Link>
    </nav>
  );
}
