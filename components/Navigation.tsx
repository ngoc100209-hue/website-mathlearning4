'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const getNavLinkClass = (href: string) =>
    pathname === href
      ? 'text-primary border-b-2 border-primary font-bold pb-1 font-body text-sm transition-colors duration-200'
      : 'text-on-surface-variant font-medium font-body text-sm transition-colors duration-200 hover:text-primary-container';

  return (
    <nav className="hidden md:flex gap-6 items-center">
      <Link href="/" className={getNavLinkClass('/')}>Trang Chủ</Link>
      <span className="text-on-surface-variant font-medium font-body text-sm cursor-not-allowed opacity-70">Giới Thiệu</span>
      <Link href="/lesson" className={getNavLinkClass('/lesson')}>Bài Học</Link>
      <Link href="/practice" className={getNavLinkClass('/practice')}>Ôn Tập</Link>
      <Link href="/contact" className={getNavLinkClass('/contact')}>Liên Hệ</Link>
    </nav>
  );
}
