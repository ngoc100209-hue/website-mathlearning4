"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CountingQuiz from '@/components/CountingQuiz';
import MathSymbolsQuiz from '@/components/MathSymbolsQuiz';

type PracticePart = "symbols" | "counting";

function PracticeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activePart, setActivePart] = useState<PracticePart>("symbols");

  useEffect(() => {
    const part = searchParams.get("part");
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (part === "counting" || hash === "#counting-quiz") {
      setActivePart("counting");
      return;
    }

    if (part === "symbols" || hash === "#symbols-quiz") {
      setActivePart("symbols");
    }
  }, [searchParams]);

  const activeHash = useMemo(
    () => (activePart === "symbols" ? "#symbols-quiz" : "#counting-quiz"),
    [activePart],
  );

  const handleChangePart = (part: PracticePart) => {
    setActivePart(part);

    const hash = part === "symbols" ? "#symbols-quiz" : "#counting-quiz";
    router.replace(`${pathname}?part=${part}${hash}`, { scroll: false });
  };

  return (
    <div className="px-4 md:px-16 py-12 md:py-20 max-w-7xl mx-auto fade-in">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Ôn Tập Toán Học</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-body text-xl">
          Thực hành các bài tập để nâng cao kỹ năng toán học của bạn thông qua các trò chơi vui nhộn và thú vị.
        </p>
      </section>

      <section className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => handleChangePart("symbols")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-200 ${
            activePart === "symbols"
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-white text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50"
          }`}
          aria-pressed={activePart === "symbols"}
        >
          Ôn tập Ký hiệu
        </button>

        <button
          onClick={() => handleChangePart("counting")}
          className={`rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-200 ${
            activePart === "counting"
              ? "bg-emerald-600 text-white shadow-lg"
              : "bg-white text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50"
          }`}
          aria-pressed={activePart === "counting"}
        >
          Ôn tập Số đếm
        </button>
      </section>

      <div className="space-y-10">
        {activePart === "symbols" ? (
          <section id="symbols-quiz" className="scroll-mt-24" key={activeHash}>
            <MathSymbolsQuiz />
          </section>
        ) : (
          <section id="counting-quiz" className="scroll-mt-24" key={activeHash}>
            <CountingQuiz />
          </section>
        )}
      </div>
    </div>
  );
}

export default function Practice() {
  return (
    <Suspense fallback={<div className="px-4 md:px-16 py-12 md:py-20 max-w-7xl mx-auto fade-in" />}>
      <PracticeContent />
    </Suspense>
  );
}
