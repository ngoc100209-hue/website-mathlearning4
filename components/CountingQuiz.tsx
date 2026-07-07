'use client';

import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const launchConfetti = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const colors = ['#16a34a', '#22c55e', '#84cc16', '#f59e0b', '#ec4899'];
  const burst = document.createElement('div');
  burst.style.position = 'fixed';
  burst.style.inset = '0';
  burst.style.pointerEvents = 'none';
  burst.style.zIndex = '9999';
  document.body.appendChild(burst);

  colors.forEach((color, index) => {
    const piece = document.createElement('span');
    piece.style.position = 'absolute';
    piece.style.left = '50%';
    piece.style.top = '50%';
    piece.style.width = '8px';
    piece.style.height = '18px';
    piece.style.background = color;
    piece.style.borderRadius = '999px';
    piece.style.transform = `translate(-50%, -50%) rotate(${index * 15}deg)`;
    piece.animate(
      [
        { transform: `translate(-50%, -50%) rotate(${index * 15}deg) scale(1)`, opacity: 1 },
        { transform: `translate(${(index % 2 === 0 ? -1 : 1) * 90 - 50}%, ${-160}%) rotate(${index * 15 + 180}deg) scale(0.4)`, opacity: 0 },
      ],
      { duration: 700, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
    burst.appendChild(piece);
  });

  window.setTimeout(() => burst.remove(), 750);
};

const toCleanEmbedUrl = (rawUrl?: string): string => {
  if (!rawUrl) return '';

  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace('www.', '');
    let videoId = '';

    if (host === 'youtu.be') {
      videoId = url.pathname.replace('/', '').trim();
    } else if (host.includes('youtube.com') || host.includes('youtube-nocookie.com')) {
      if (url.pathname.includes('/embed/')) {
        videoId = url.pathname.split('/embed/')[1]?.split('/')[0] ?? '';
      } else {
        videoId = url.searchParams.get('v') ?? '';
      }
    }

    if (!videoId) return rawUrl;

    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      rel: '0',
      modestbranding: '1',
      iv_load_policy: '3',
      fs: '0',
      playsinline: '1',
      loop: '1',
      playlist: videoId,
    });

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  } catch {
    return rawUrl;
  }
};

type QuestionOption = {
  id: string;
  value?: string;
  image?: string;
  video?: string;
  label?: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  alt?: string;
  imageFocus?: {
    mode: 'one' | 'both';
    side?: 'left' | 'right' | 'center';
    y?: string;
    zoom?: number;
  };
};

type Question = {
  id: number;
  type: 'text-image' | 'text_choices_image' | 'text_choices_video' | 'true_false_video';
  questionText: string;
  imageUrl?: string;
  questionVideo?: string;
  imageFocus?: {
    mode: 'one' | 'both';
    side?: 'left' | 'right' | 'center';
    y?: string;
    zoom?: number;
  };
  options: QuestionOption[];
  correctAnswer: string;
  explanation?: string;
};

const getImageFocusStyle = (focus?: { mode: 'one' | 'both'; side?: 'left' | 'right' | 'center'; y?: string; zoom?: number }) => {
  const mode = focus?.mode ?? 'one';
  const side = focus?.side ?? 'center';
  const y = focus?.y ?? '24%';
  const objectPosition = side === 'left' ? `35% ${y}` : side === 'right' ? `65% ${y}` : `50% ${y}`;
  const baseScale = mode === 'both' ? 1.36 : 1.52;
  const scale = focus?.zoom ?? baseScale;

  return {
    objectPosition,
    transform: `scale(${scale})`,
    transformOrigin: 'center',
  } as React.CSSProperties;
};

// =========================
// DỮ LIỆU CÂU HỎI - THAY THẾ LINK ẢNH/VIDEO TẠI ĐÂY
// =========================
const questionsData: Question[] = [
{
    id: 1,
    type: 'text_choices_image',
    questionText: 'Đâu là số 10?',
    options: [
      { id: 'A', image: 'https://i.postimg.cc/1t44C4Tk/copy-0DADD738-8992-4104-B38E-AB0FD6D3E409.png', imageFocus: { mode: 'both', side: 'center', y: '28%', zoom: 1.28 } },
      { id: 'B', image: 'https://i.postimg.cc/NG5NhcH6/copy-9F636C4B-A00B-4D8A-8862-6DF252DB89EF.png', imageFocus: { mode: 'both', side: 'center', y: '28%', zoom: 1.28 } },
      { id: 'C', image: 'https://i.postimg.cc/bvyTmcPv/copy-4372552D-72C0-4075-98F1-66224F7896DE.png', imageFocus: { mode: 'both', side: 'center', y: '30%', zoom: 1.26 } },
      { id: 'D', image: 'https://i.postimg.cc/MTc1LzFq/copy-F3B534C8-FEEA-4903-BD73-596B187D9B09.png', imageFocus: { mode: 'both', side: 'center', y: '30%', zoom: 1.26 } },
    ],
    correctAnswer: 'C',
    explanation: 'Lựa chọn C là hình ảnh đúng cho số 10.',
  },
  {
    id: 2,
    type: 'text_choices_video',
    questionText: 'Đâu là số 7',
    options: [
      { id: 'A', value: 'Video số 1', video: 'https://www.youtube.com/embed/ddgodaimw0o' },
      { id: 'B', value: 'Video số 2', video: 'https://www.youtube.com/embed/yzW2aTi4CKA' },
      { id: 'C', value: 'Video số 3', video: 'https://www.youtube.com/embed/NTXBOdWR59w' },
      { id: 'D', value: 'Video số 4', video: 'https://www.youtube.com/embed/40Bp2diGb8g' },
    ],
    correctAnswer: 'B',
    explanation: 'Video ở lựa chọn B minh họa đúng số 7.',
  },
  {
    id: 3,
    type: 'true_false_video',
    questionText: 'Đây là số 70. Đúng hay sai?',
    questionVideo: 'https://www.youtube.com/embed/40Bp2diGb8g',
    options: [
      { id: 'TRUE', value: 'Đúng', image: 'https://i.postimg.cc/15M4DLvC/dau-tick.jpg', imageFocus: { mode: 'both', side: 'center', y: '35%', zoom: 1.2 } },
      { id: 'FALSE', value: 'Sai', image: 'https://i.postimg.cc/W3R42j4v/dau-x.png', imageFocus: { mode: 'both', side: 'center', y: '35%', zoom: 1.2 } },
    ],
    correctAnswer: 'TRUE',
    explanation: 'Đây là số 70 nên đáp án là Đúng.',
  },
];

export default function CountingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});

  const question = questionsData[currentQuestion];
  const answered = answers[currentQuestion] !== undefined;
  const selectedAnswer = answers[currentQuestion];
  const isCorrect = feedback[currentQuestion];

  const progressText = useMemo(() => `${currentQuestion + 1}/${questionsData.length}`, [currentQuestion]);
  const correctCount = useMemo(() => Object.values(feedback).filter(Boolean).length, [feedback]);

  const handleSelect = (optionId: string) => {
    if (answered) return;

    const isRight = optionId === question.correctAnswer;
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionId }));
    setFeedback((prev) => ({ ...prev, [currentQuestion]: isRight }));

    if (isRight) {
      launchConfetti();
    }
  };

  const goToNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const renderMedia = (src?: string) => {
    if (!src) return null;
    const isVideoFile = /\.mp4($|\?)/i.test(src) || /\.webm($|\?)/i.test(src);

    if (isVideoFile) {
      return (
        <video className="w-full rounded-xl" controls muted playsInline>
          <source src={src} type="video/mp4" />
        </video>
      );
    }

    return (
      <iframe
        src={toCleanEmbedUrl(src)}
        title="video"
        className="h-56 w-full rounded-xl border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">Học phần số đếm</p>
          <h2 className="text-2xl font-bold text-gray-800">Nhận biết số đếm</h2>
        </div>
        <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
          Câu {progressText}
        </div>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-linear-to-r from-green-500 to-emerald-500 transition-all"
          style={{ width: `${((currentQuestion + 1) / questionsData.length) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-linear-to-br from-green-50 to-emerald-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-green-700">
          <Sparkles size={18} />
          <span className="text-sm font-semibold">Câu hỏi {currentQuestion + 1}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{question.questionText}</h3>

        {question.imageUrl && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-inner">
            <img src={question.imageUrl} alt={question.questionText} className="h-56 w-full rounded-xl object-cover" style={getImageFocusStyle(question.imageFocus)} />
          </div>
        )}

        {question.questionVideo && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-black p-3 shadow-inner">
            {renderMedia(question.questionVideo)}
          </div>
        )}
      </div>

      <div className="mt-6">
        {question.type === 'text-image' && (
          <div className="grid gap-3 md:grid-cols-2">
            {question.options.map((option) => {
              const selected = selectedAnswer === option.id;
              const isCorrectOption = question.correctAnswer === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={answered}
                  className={`rounded-2xl border p-4 text-left font-semibold transition-all ${
                    answered
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : selected
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 bg-white text-gray-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <span className="mr-2 text-lg">{option.id}.</span>
                  {option.value}
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'text_choices_image' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {question.options.map((option) => {
              const selected = selectedAnswer === option.id;
              const isCorrectOption = question.correctAnswer === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={answered}
                  className={`rounded-2xl border p-3 text-left transition-all ${
                    answered
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-50'
                        : selected
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-white'
                      : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{option.id}</span>
                    {selected && answered && <CheckCircle2 size={18} className={isCorrectOption ? 'text-green-600' : 'text-red-600'} />}
                  </div>
                  {option.image ? <img src={option.image} alt={option.id} className="h-28 w-full rounded-xl object-cover" style={getImageFocusStyle(option.imageFocus)} /> : null}
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'text_choices_video' && (
          <div className="grid gap-4 sm:grid-cols-2">
            {question.options.map((option) => {
              const selected = selectedAnswer === option.id;
              const isCorrectOption = question.correctAnswer === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={answered}
                  className={`rounded-2xl border p-3 text-left transition-all ${
                    answered
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-50'
                        : selected
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-white'
                      : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{option.id}</span>
                    {selected && answered && <CheckCircle2 size={18} className={isCorrectOption ? 'text-green-600' : 'text-red-600'} />}
                  </div>
                  <div className="mb-2 text-sm font-medium text-gray-600">{option.value}</div>
                  {option.video ? (
                    <div className="overflow-hidden rounded-xl bg-black">
                      {renderMedia(option.video)}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'true_false_video' && (
          <div className="grid gap-4 md:grid-cols-2">
            {question.options.map((option) => {
              const selected = selectedAnswer === option.id;
              const isCorrectOption = question.correctAnswer === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={answered}
                  className={`rounded-2xl border p-5 text-center transition-all ${
                    answered
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-50'
                        : selected
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-white'
                      : 'border-gray-200 bg-white hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  {option.image ? <img src={option.image} alt={option.value} className="mx-auto h-16 w-16 rounded-full object-cover" style={getImageFocusStyle(option.imageFocus)} /> : null}
                  <div className="mt-3 text-lg font-bold text-gray-700">{option.value}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {answered && (
        <div className={`mt-5 rounded-2xl border p-4 text-sm ${isCorrect ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
          <div className="font-semibold">{isCorrect ? '✅ Đúng rồi!' : '❌ Chưa đúng rồi!'}</div>
          <div className="mt-1">{question.explanation}</div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={goToPrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={18} /> Câu trước
        </button>

        <div className="text-sm font-semibold text-gray-500">
          Đã đúng: {correctCount}/{questionsData.length}
        </div>

        <button
          onClick={goToNext}
          disabled={currentQuestion === questionsData.length - 1}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-semibold text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Câu tiếp theo <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
