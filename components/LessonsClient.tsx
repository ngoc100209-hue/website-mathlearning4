"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Play, Loader2 } from "lucide-react";

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

export default function LessonsClient({ initialLessons }: LessonsClientProps) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    initialLessons[0]?.id || ""
  );
  const [loading, setLoading] = useState(false);

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);
  const selectedIndex = lessons.findIndex((l) => l.id === selectedLessonId);
  const hasNextLesson = selectedIndex < lessons.length - 1;

  const handleCompleteLesson = async () => {
    if (!selectedLessonId) return;

    setLoading(true);
    try {
      const response = await fetch("/api/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: selectedLessonId }),
      });

      if (response.ok) {
        // Cập nhật trạng thái bài học hiện tại
        setLessons((prev) =>
          prev.map((lesson) =>
            lesson.id === selectedLessonId
              ? { ...lesson, isCompleted: true, completedAt: new Date().toISOString() }
              : lesson
          )
        );

        // Chuyển sang bài học tiếp theo nếu có
        if (hasNextLesson) {
          setTimeout(() => {
            setSelectedLessonId(lessons[selectedIndex + 1].id);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("❌ Lỗi khi hoàn thành bài học:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Play className="w-10 h-10 text-indigo-600" />
            Bài Học Toán
          </h1>
          <p className="text-gray-600 mt-2">Học toán một cách hiệu quả cùng bài giảng video chất lượng cao</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Menu Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-indigo-600 text-white p-4">
                <h2 className="text-lg font-semibold">Danh Sách Bài Học</h2>
              </div>
              <div className="divide-y">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full p-4 text-left transition-all duration-200 ${
                      selectedLessonId === lesson.id
                        ? "bg-indigo-100 border-l-4 border-indigo-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {lesson.isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          Bài {lesson.order}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {lesson.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedLesson ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Lesson Title */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
                  <h2 className="text-3xl font-bold">Bài {selectedLesson.order}: {selectedLesson.title}</h2>
                  {selectedLesson.isCompleted && (
                    <div className="flex items-center gap-2 mt-3 text-green-200">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Đã hoàn thành</span>
                    </div>
                  )}
                </div>

                {/* Video Player */}
                <div className="aspect-video bg-black">
                  {selectedLesson.videoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-lg">
                      Chưa có video
                    </div>
                  )}
                </div>

                {/* Action Section */}
                <div className="p-6 bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div>
                      {selectedLesson.isCompleted && (
                        <p className="text-green-600 font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          ✓ Bạn đã hoàn thành bài học này
                        </p>
                      )}
                    </div>

                    {!selectedLesson.isCompleted ? (
                      <button
                        onClick={handleCompleteLesson}
                        disabled={loading}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          "✓ Nhấn để hoàn thành"
                        )}
                      </button>
                    ) : hasNextLesson ? (
                      <button
                        onClick={() =>
                          setSelectedLessonId(lessons[selectedIndex + 1].id)
                        }
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                      >
                        Bài học tiếp theo →
                      </button>
                    ) : (
                      <div className="px-8 py-3 bg-blue-100 text-blue-700 font-semibold rounded-lg text-center">
                        🎉 Bạn đã hoàn thành tất cả bài học!
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-4 bg-white border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Tiến độ học tập
                    </span>
                    <span className="text-sm font-semibold text-indigo-600">
                      {lessons.filter((l) => l.isCompleted).length} / {lessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(
                          (lessons.filter((l) => l.isCompleted).length /
                            lessons.length) *
                          100
                        ).toFixed(0)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">Không có bài học nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
