import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export const metadata = {
  title: 'MathSign — Học Toán bằng ngôn ngữ ký hiệu',
  description: 'MathSign: nền tảng học toán trực quan dành cho trẻ em với video ký hiệu và bài tập tương tác.',
  openGraph: {
    title: 'MathSign — Học Toán bằng ngôn ngữ ký hiệu',
    description: 'Nền tảng học toán trực quan cho trẻ em với video ký hiệu và trò chơi tương tác.',
    url: 'https://your-domain.example',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <div className="flex min-h-screen flex-col font-body text-on-surface selection:bg-primary-fixed">
          <Header />
          <main className="flex-1 w-full max-w-[1280px] mx-auto">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
