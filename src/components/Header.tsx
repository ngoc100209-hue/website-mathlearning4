"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hand, Menu } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const getLinkClass = (path: string) =>
    isActive(path)
      ? "text-primary border-b-2 border-primary font-bold pb-1 font-body text-sm transition-colors duration-200"
      : "text-on-surface-variant font-medium font-body text-sm transition-colors duration-200 hover:text-primary-container";

  return (
    <header className="bg-surface sticky top-0 z-50 w-full flex items-center border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-4 md:px-16 max-w-[1280px] mx-auto h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold text-primary">MathSign</span>
        </Link>
        
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className={getLinkClass("/")}>Trang Chủ</Link>
          {/* Mocking Giới thiệu for now as we don't have the page */}
          <span className="text-on-surface-variant font-medium font-body text-sm cursor-not-allowed opacity-70">Giới Thiệu</span>
          <Link href="/lesson" className={getLinkClass("/lesson")}>Bài Học</Link>
          <Link href="/practice" className={getLinkClass("/practice")}>Ôn Tập</Link>
          <Link href="/contact" className={getLinkClass("/contact")}>Liên Hệ</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-primary p-2 rounded-full hover:bg-primary-fixed transition-colors duration-200 flex items-center justify-center">
            <Hand size={28} />
          </button>
          <button className="md:hidden text-on-surface flex items-center justify-center">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
