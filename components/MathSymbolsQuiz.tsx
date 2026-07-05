'use client';

import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Link2 } from 'lucide-react';

const launchConfetti = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const colors = ['#2563eb', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'];
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

type Question = {
  id: number;
  type: 
    | 'image-options' 
    | 'text-image' 
    | 'match' 
    | 'image-options-2' 
    | 'text-video' 
    | 'match-video' 
    | 'drag-drop-video'; // thêm type mới cho dạng kéo thả

  question: string;
  imageUrl?: string;
  videoUrl?: string;
  imageFocus?: {
    mode: 'one' | 'both';
    side?: 'left' | 'right' | 'center';
    y?: string;
    zoom?: number;
  };

  // dùng cho dạng trắc nghiệm thông thường
  options?: Array<{ 
    label: string; 
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
  }>;

  correctAnswer?: string;
  explanation?: string;

  // dùng cho dạng match cũ
  matchPairs?: Array<{ 
    id: string; 
    label: string; 
    videoUrl?: string 
  }>;

  // thêm cho dạng kéo thả nhiều từ - nhiều video
  videos?: Array<{ 
    id: string; 
    videoUrl: string 
  }>;

  words?: Array<{ 
    id: string; 
    label: string 
  }>;

  correctPairs?: Array<{ 
    wordId: string; 
    videoId: string 
  }>;
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
    type: 'image-options',
    question: 'Chọn hình ảnh tương ứng với dấu cộng',
    options: [
      { label: 'A', imageUrl: 'https://i.postimg.cc/XJS6Qtgz/Thiet-ke-chua-co-ten-(1).png', alt: 'Hình cộng', imageFocus: { mode: 'one', side: 'center', y: '28%' } },
      { label: 'B', imageUrl: 'https://i.postimg.cc/7Zzk0x3f/z7927490753303-3f753afe01dc24bd5c0637cc7a8186a9.jpg', alt: 'Hình trừ', imageFocus: { mode: 'one', side: 'center', y: '28%' } },
      { label: 'C', imageUrl: 'https://i.postimg.cc/4xcgVJ63/z7927490727788-6138576aaeae8ca60633cc1d1fab11c5.jpg', alt: 'Hình nhân', imageFocus: { mode: 'one', side: 'center', y: '28%' } },
      { label: 'D', imageUrl: 'https://i.postimg.cc/FHS439yR/z7927490746629-bcc9956e0e5b078a13d1556a1d882140.jpg', alt: 'Hình chia', imageFocus: { mode: 'one', side: 'center', y: '28%' } },
    ],
    correctAnswer: 'A',
    explanation: 'Dấu cộng được biểu diễn bằng ký hiệu +.',
  },
  {
    id: 2,
    type: 'text-video',
    question: 'Video biểu diễn dấu gì?',
    videoUrl: 'https://www.youtube.com/embed/-bEFV9rPse8',
    options: [
      { label: 'A', text: 'x dấu nhân' },
      { label: 'B', text: '- dấu trừ' },
      { label: 'C', text: ': dấu chia' },
      { label: 'D', text: '+ dấu cộng' },
    ],
    correctAnswer: 'C',
    explanation: 'Phép trừ được biểu thị bằng ký hiệu -.',
  },
  {

  id: 4,
  type: 'match-video',
  question: 'Ghép mỗi ký hiệu với video biểu thị ký hiệu đó',
  videos: [
    { id: 'v1', videoUrl: 'https://youtube.com/embed/4IJ6xhTQXYY' },
    { id: 'v2', videoUrl: 'https://youtube.com/embed/8HMd6pDO05M' },
    { id: 'v3', videoUrl: 'https://youtube.com/embed/xgRub31kMkQ' },
    { id: 'v4', videoUrl: 'https://youtube.com/embed/QqoHifdjZ2g' },
  ],
  words: [
    { id: 'dấu lớn', label: '>' },
    { id: 'dấu bé', label: '<' },
    { id: 'dấu bằng', label: '=' },
    { id: 'dấu cộng', label: '+' },
  ],
  correctPairs: [
    { wordId: 'dấu lớn', videoId: 'v2' },
    { wordId: 'dấu bé', videoId: 'v3' },
    { wordId: 'dấu bằng', videoId: 'v1' },
    { wordId: 'dấu cộng', videoId: 'v4' },
  ],
  explanation: 'Mỗi ký hiệu được ghép với video minh họa tương ứng.',
}
,
  {
    id: 5,
    type: 'image-options',
    question: '1+1 bằng bao nhiêu?',
    options: [
      { label: 'A', imageUrl: 'https://i.postimg.cc/XY5bdVwR/z7927490720466-5626d4c376b6961d5aa353fed7f92772.jpg', alt: '3', imageFocus: { mode: 'both', side: 'center', y: '30%' } },
      { label: 'B', imageUrl: 'https://i.postimg.cc/mg9sCbYZ/z7927490737579-91172745321867ccd5b6d3c41e8b2983.jpg', alt: '4', imageFocus: { mode: 'both', side: 'center', y: '30%' } },
      { label: 'C', imageUrl: 'https://i.postimg.cc/g2hW8YVF/z7927490698920-59ed1e07cc7b9a723966aa3011d97633-Sao-chep-Sao-chep.jpg', alt: '7', imageFocus: { mode: 'one', side: 'right', y: '28%' } },
      { label: 'D', imageUrl: 'https://i.postimg.cc/KYyy5df8/z7927490708254-64250962da5761905bed63b30dca0659.jpg', alt: '2', imageFocus: { mode: 'one', side: 'left', y: '28%' } },
    ],
    correctAnswer: 'D',
    explanation: 'Dấu nhân được biểu diễn bằng ký hiệu ×.',
  },
];

export default function MathSymbolsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const question = questionsData[currentQuestion];
  const answered = answers[currentQuestion] !== undefined;
  const selectedAnswer = answers[currentQuestion];
  const isCorrect = feedback[currentQuestion];
  const progressText = useMemo(() => `${currentQuestion + 1}/${questionsData.length}`, [currentQuestion]);
  const correctCount = useMemo(() => Object.values(feedback).filter(Boolean).length, [feedback]);

  const handleSelect = (label: string) => {
    if (answered) return;

    const isRight = label === question.correctAnswer;
    setAnswers((prev) => ({ ...prev, [currentQuestion]: label }));
    setFeedback((prev) => ({ ...prev, [currentQuestion]: isRight }));

    if (isRight) {
      launchConfetti();
    }
  };

  const handleMatchSelect = (value: string, type: 'video' | 'symbol') => {
  if (type === 'video') {
    setSelectedVideo(value);
    return;
  }

  setSelectedSymbol(value);
  if (!selectedVideo) return;

  const pairKey = `${selectedVideo}-${value}`;
  let isCorrectPair = false;

  // Nếu là dạng match-video phức tạp thì check theo correctPairs
  if (question?.type === 'match-video' && question?.correctPairs) {
    isCorrectPair = question.correctPairs.some(
      (p) => p.videoId === selectedVideo && p.wordId === value
    );
  } else {
    // Dạng nối đơn giản (câu 3)
    isCorrectPair = selectedVideo === value;
  }

  if (isCorrectPair) {
    setMatchedPairs((prev) => (prev.includes(pairKey) ? prev : [...prev, pairKey]));
    launchConfetti();
  }

  // Reset để chuẩn bị cho lần ghép tiếp theo
  setSelectedVideo(null);
  setSelectedSymbol(null);
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

 return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Học phần kí hiệu</p>
          <h2 className="text-2xl font-bold text-gray-800">Nhận biết kí hiệu toán học</h2>
        </div>
        <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Câu {progressText}
        </div>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-500 transition-all"
          style={{ width: `${((currentQuestion + 1) / (questionsData?.length || 1)) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-linear-to-br from-blue-50 to-cyan-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-blue-700">
          <Sparkles size={18} />
          <span className="text-sm font-semibold">Câu hỏi {currentQuestion + 1}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{question?.question}</h3>

        {/* Main question image (square container, image covers fully) */}
        {question && "imageUrl" in question && question.imageUrl && (
          <div className="mt-5 w-48 h-48 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
            <img src={question.imageUrl} alt={question.question} className="w-full h-full object-cover" style={getImageFocusStyle(question.imageFocus)} />
          </div>
        )}
      </div>

      <div className="mt-6">
        {/* IMAGE OPTIONS */}
        {question?.type === "image-options" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Ép kiểu an toàn (Array.isArray) kết hợp với fallback [] */}
            {(Array.isArray(question?.options) ? question.options : []).map((option) => {
              const selected = selectedAnswer === option?.label;
              const isCorrectOption = question && "correctAnswer" in question && question.correctAnswer === option?.label;
              return (
                <button
                  key={option?.label}
                  onClick={() => handleSelect(option?.label)}
                  disabled={answered}
                  className={`rounded-2xl border p-3 text-left transition-all ${answered ? (isCorrectOption ? "border-green-500 bg-green-50" : selected ? "border-red-500 bg-red-50" : "border-gray-200 bg-white") : "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50"}`}
                >
                  <div className="mb-2 text-sm font-semibold text-gray-700">{option?.label}</div>

                  {/* square container + image fit */}
                  {option?.imageUrl && (
                    <div className="w-48 h-48 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                      <img src={option.imageUrl} alt={option.alt || option.label} className="w-full h-full object-cover transform transition-transform duration-300 ease-out hover:scale-135" style={getImageFocusStyle(option.imageFocus)} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* TEXT-VIDEO (video + text options) */}
        {question?.type === "text-video" && (
          <div className="space-y-4">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={toCleanEmbedUrl(question?.videoUrl)}
                title={question?.question}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Options */}
            <div className="grid gap-3 md:grid-cols-2">
              {/* Đảm bảo luôn luôn là mảng để tránh crash */}
              {(Array.isArray(question?.options) ? question.options : []).map((option) => {
                const selected = selectedAnswer === option?.label;
                const isCorrectOption = question?.correctAnswer === option?.label;
                return (
                  <button
                    key={option?.label}
                    onClick={() => handleSelect(option?.label)}
                    disabled={answered}
                    className={`rounded-2xl border p-4 text-left font-semibold transition-all ${
                      answered
                        ? isCorrectOption
                          ? "border-green-500 bg-green-50 text-green-700"
                          : selected
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 bg-white text-gray-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    <span className="mr-2 text-lg">{option?.label}.</span>
                    {option?.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TEXT-IMAGE (text choices) */}
        {question?.type === "text-image" && (
          <div className="grid gap-3 md:grid-cols-2">
            {(Array.isArray(question?.options) ? question.options : []).map((option) => {
              const selected = selectedAnswer === option?.label;
              const isCorrectOption = question && "correctAnswer" in question && question.correctAnswer === option?.label;
              return (
                <button
                  key={option?.label}
                  onClick={() => handleSelect(option?.label)}
                  disabled={answered}
                  className={`rounded-2xl border p-4 text-left font-semibold transition-all ${answered ? (isCorrectOption ? "border-green-500 bg-green-50 text-green-700" : selected ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 bg-white text-gray-600") : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"}`}
                >
                  <span className="mr-2 text-lg">{option?.label}.</span>
                  {option?.text}
                </button>
              );
            })}
          </div>
        )}

        {/* MATCH-VIDEO (Câu số 4: Ghép từ/ký hiệu với Video tương ứng) */}
{question?.type === "match-video" && (
  <div className="grid gap-4 lg:grid-cols-2">
    {/* Cột hiển thị các Video mã nhúng iframe */}
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h4 className="mb-3 font-semibold text-gray-700">Danh sách Video</h4>
      <div className="grid gap-3">
        {(Array.isArray(question?.videos) ? question.videos : []).map((v) => (
          <button
            key={v?.id}
            onClick={() => handleMatchSelect(v?.id, "video")}
            className={`rounded-xl border p-2 text-left transition-all overflow-hidden ${
              selectedVideo === v?.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
            }`}
          >
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={toCleanEmbedUrl(v?.videoUrl)}
                title="Match Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full pointer-events-none" // pointer-events-none để không bị dính click vào video khi bấm chọn box
              ></iframe>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Cột hiển thị các từ / ký hiệu toán học */}
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h4 className="mb-3 font-semibold text-gray-700">Ký hiệu</h4>
      <div className="grid gap-3">
        {(Array.isArray(question?.words) ? question.words : []).map((w) => {
          // Kiểm tra xem cặp này đã được nối đúng trước đó chưa
          const isMatched = matchedPairs.some(pair => pair.includes(w?.id));
          return (
            <button
              key={w?.id}
              disabled={isMatched}
              onClick={() => handleMatchSelect(w?.id, "symbol")}
              className={`rounded-xl border p-4 text-center text-lg font-bold transition-all ${
                isMatched 
                  ? "border-green-300 bg-green-50 text-green-600 opacity-60 cursor-not-allowed"
                  : selectedSymbol === w?.id 
                  ? "border-blue-500 bg-blue-50 text-blue-700" 
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
              }`}
            >
              <div className="text-sm font-normal text-gray-500 mb-1">{w?.id}</div>
              <div className="text-xl font-bold">{w?.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
)} 
      {/* MATCH (video <-> symbol) */}
        {question?.type === "match" && (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h4 className="mb-3 font-semibold text-gray-700">Video</h4>
              <div className="grid gap-3">
                {(Array.isArray(question?.options) ? question.options : []).map((option) => (
                  <button
                    key={option?.label}
                    onClick={() => handleMatchSelect(option?.label, "video")}
                    className={`rounded-xl border p-2 text-left transition-all ${selectedVideo === option?.label ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
                  >
                    <video className="h-24 w-full rounded-lg object-cover" controls muted playsInline>
                      <source src={option?.videoUrl} type="video/mp4" />
                    </video>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h4 className="mb-3 font-semibold text-gray-700">Ký hiệu</h4>
              <div className="grid gap-3">
                {/* Kiểm tra an toàn cho mảng matchPairs */}
                {(Array.isArray(question?.matchPairs) ? question.matchPairs : []).map((pair) => (
                  <button
                    key={pair?.id}
                    onClick={() => handleMatchSelect(pair?.label, "symbol")}
                    className={`rounded-xl border p-3 text-center text-lg font-bold transition-all ${selectedSymbol === pair?.label ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700"}`}
                  >
                    {pair?.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* IMAGE-OPTIONS-2 */}
        {question?.type === "image-options-2" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {(Array.isArray(question?.options) ? question.options : []).map((option) => {
              const selected = selectedAnswer === option?.label;
              const isCorrectOption = question && "correctAnswer" in question && question.correctAnswer === option?.label;
              return (
                <button
                  key={option?.label}
                  onClick={() => handleSelect(option?.label)}
                  disabled={answered}
                  className={`rounded-2xl border p-3 text-left transition-all ${answered ? (isCorrectOption ? "border-green-500 bg-green-50" : selected ? "border-red-500 bg-red-50" : "border-gray-200 bg-white") : "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50"}`}
                >
                  <div className="mb-2 text-sm font-semibold text-gray-700">{option?.label}</div>

                  {/* square container + image fit */}
                  {option?.imageUrl && (
                    <div className="w-48 h-48 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                      <img src={option.imageUrl} alt={option.alt || option.label} className="w-full h-full object-cover transform transition-transform duration-300 ease-out hover:scale-135" style={getImageFocusStyle(option.imageFocus)} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {answered && (
        <div className={`mt-5 rounded-2xl border p-4 text-sm ${isCorrect ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
          <div className="font-semibold">{isCorrect ? "✅ Đúng rồi!" : "❌ Chưa đúng rồi!"}</div>
          <div className="mt-1">{(question && "explanation" in question && question.explanation) || ""}</div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button onClick={goToPrevious} disabled={currentQuestion === 0} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 transition-all disabled:cursor-not-allowed disabled:opacity-50">
          <ChevronLeft size={18} /> Câu trước
        </button>

        <div className="text-sm font-semibold text-gray-500">Đã đúng: {correctCount}/{questionsData?.length || 0}</div>

        <button onClick={goToNext} disabled={currentQuestion === (questionsData?.length || 1) - 1} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
          Câu tiếp theo <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}