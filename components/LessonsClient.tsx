"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, Play } from "lucide-react";
import { useState } from "react";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  order: number;
  isCompleted: boolean;
  completedAt: string | null;
}

interface LessonsClientProps {
  initialLessons: Lesson[];
}

const normalizeVideoUrl = (rawUrl: string): string => {
  if (!rawUrl) return '';

  return rawUrl
    .trim()
    .replace('youtube.com/embed//', 'youtube.com/embed/')
    .replace('youtu.be/', 'www.youtube.com/embed/');
};

const getPracticeHref = (lesson: Lesson): string => {
  const title = lesson.title.toLowerCase();

  if (
    title.includes("kí hiệu") ||
    title.includes("ký hiệu") ||
    title.includes("ki hieu") ||
    title.includes("ky hieu")
  ) {
    return "/practice?part=symbols#symbols-quiz";
  }

  if (
    title.includes("số đếm") ||
    title.includes("so dem") ||
    title.includes("đếm") ||
    title.includes("dem") ||
    title.includes("số") ||
    title.includes("so")
  ) {
    return "/practice?part=counting#counting-quiz";
  }

  return "/practice";
};

export default function LessonsClient({ initialLessons }: LessonsClientProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialLessons[0]?.id || ""
  );
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId);
  const selectedIndex = lessons.findIndex((lesson) => lesson.id === selectedLessonId);
  const hasNextLesson = selectedIndex >= 0 && selectedIndex < lessons.length - 1;

  const handleCompleteLesson = async () => {
    if (!selectedLessonId) return;

    setActionError("");
    setLoading(true);

    try {
      const response = await fetch("/api/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: selectedLessonId }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/auth?redirect_url=/lessons";
          return;
        }

        setActionError("Không thể đánh dấu hoàn thành. Vui lòng thử lại.");
        return;
      }

      setLessons((prev) =>
        prev.map((lesson) =>
          lesson.id === selectedLessonId
            ? {
                ...lesson,
                isCompleted: true,
                completedAt: new Date().toISOString(),
              }
            : lesson
        )
      );
    } catch (error) {
      console.error("Lỗi khi hoàn thành bài học:", error);
      setActionError("Có lỗi mạng khi lưu tiến độ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const completedCount = lessons.filter((lesson) => lesson.isCompleted).length;
  const progressPercent =
    lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-gray-900">
            <Play className="h-10 w-10 text-indigo-600" />
            Bài Học Toán
          </h1>
          <p className="mt-2 text-gray-600">
            Học toán một cách hiệu quả cùng bài giảng video chất lượng cao
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="sticky top-6 overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="bg-indigo-600 p-4 text-white">
                <h2 className="text-lg font-semibold">Danh Sách Bài Học</h2>
              </div>

              <div className="divide-y">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full p-4 text-left transition-all duration-200 ${
                      selectedLessonId === lesson.id
                        ? "border-l-4 border-indigo-600 bg-indigo-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        {lesson.isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">Bài {lesson.order}</p>
                        <p className="truncate text-xs text-gray-600">{lesson.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {selectedLesson ? (
              <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                <div className="bg-linear-to-r from-indigo-600 to-blue-600 p-6 text-white">
                  <h2 className="text-3xl font-bold">
                    Bài {selectedLesson.order}: {selectedLesson.title}
                  </h2>

                  {selectedLesson.isCompleted ? (
                    <div className="mt-3 flex items-center gap-2 text-green-200">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">Đã hoàn thành</span>
                    </div>
                  ) : null}
                </div>

                <div className="aspect-video bg-black">
                  {selectedLesson.videoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={normalizeVideoUrl(selectedLesson.videoUrl)}
                      title={selectedLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg text-white">
                      Chưa có video
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-6">
                  {selectedLesson.isCompleted ? (
                    <div className="mb-4 flex justify-end">
                      <Link
                        href={getPracticeHref(selectedLesson)}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-700"
                      >
                        Làm Bài Tập Ngay
                      </Link>
                    </div>
                  ) : null}

                  <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div>
                      {selectedLesson.isCompleted ? (
                        <p className="flex items-center gap-2 font-medium text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                          ✓ Bạn đã hoàn thành bài học này
                        </p>
                      ) : null}
                    </div>

                    {!selectedLesson.isCompleted ? (
                      <button
                        onClick={handleCompleteLesson}
                        disabled={loading}
                        className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-green-500 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-600 disabled:bg-gray-400"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          "✓ Nhấn để hoàn thành"
                        )}
                      </button>
                    ) : (
                      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                        {hasNextLesson ? (
                          <button
                            onClick={() => setSelectedLessonId(lessons[selectedIndex + 1].id)}
                            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
                          >
                            Bài học tiếp theo →
                          </button>
                        ) : (
                          <div className="rounded-lg bg-blue-100 px-6 py-3 text-center font-semibold text-blue-700">
                            🎉 Bạn đã hoàn thành tất cả bài học!
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {actionError ? (
                    <p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                      {actionError}
                    </p>
                  ) : null}
                </div>

                <div className="border-t bg-white px-6 py-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Tiến độ học tập</span>
                    <span className="text-sm font-semibold text-indigo-600">
                      {completedCount} / {lessons.length}
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-green-500 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center shadow-lg">
                <p className="text-lg text-gray-500">Không có bài học nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
