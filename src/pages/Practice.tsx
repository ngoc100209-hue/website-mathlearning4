import { useState } from "react";
import { Lightbulb, CheckCircle2, Send, Trophy, Timer, Video } from "lucide-react";

export default function Practice() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnswer) {
 
      alert("Bé hãy chọn một đáp án nhé!");
      return;
    }

    if (selectedAnswer === "3") {
      setStatus("success");
      setTimeout(() => {
        alert("Giỏi quá! Bé đã trả lời đúng rồi.");
        // Normally reload or go to next question
        setStatus("idle");
        setSelectedAnswer(null);
      }, 1500);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1000);
    }
  };

  return (
    <div className="px-4 md:px-16 py-12 max-w-[1280px] mx-auto fade-in">
      {/* Progress Section */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="flex justify-between items-end mb-2">
          <span className="font-headline text-2xl font-extrabold text-primary">Câu hỏi 3/10</span>
          <span className="font-body text-sm font-semibold text-on-surface-variant">Tiến độ: 30%</span>
        </div>
        <div className="w-full bg-secondary-fixed h-3 rounded-full overflow-hidden">
          <div className="bg-primary-container h-full transition-all duration-700 ease-out" style={{ width: "30%" }}></div>
        </div>
      </div>

      {/* Quiz Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Question Content */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl border border-outline-variant p-8 md:p-12 shadow-sm">
          <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-extrabold text-on-background">Bé hãy đếm xem có bao nhiêu viên kẹo nhé?</h1>
            
            {/* Illustration Area */}
            <div className="aspect-video bg-secondary-container rounded-2xl flex items-center justify-center p-6 md:p-8 overflow-hidden relative group">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-fixed rounded-full opacity-50 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-tertiary-fixed rounded-full opacity-30 blur-3xl group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="relative z-10 flex gap-6 md:gap-8">
                <div className="animate-bounce" style={{ animationDelay: "0s" }}>
                  <img alt="Candy 1" className="w-20 h-20 md:w-32 md:h-32 object-contain drop-shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4zIUcShHmhThdCxmVs7D2mNvoR4sUVbNyWguw0Ge9XdUowL2bRNLMSjRld_Ea1ZXXmyIX961stlYYvmBA9voICk_cxdPViEoDQTT6mKaJRTnToAnO7XKSB_S4rZLLzt9e9DG3E1fm9bjuhR42-TL17KmkHAdWR-AiZsugUgUyHHK-Hzgrt5keFooMFSO11P4Ch1GyhKEdsuijawi8tAxeyOM44o9ZuIcULJGFBEDMssGp7tjDIWoLzi1aKfesKpFmuXnAtp42uOk" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                  <img alt="Candy 2" className="w-20 h-20 md:w-32 md:h-32 object-contain drop-shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDtNngzBOHOK0plmp84Snet-4iG1bAd0ci82Og6vKdv_bn_KqE5drHdiLDojRxnFMP2JsFW6cJTEJSb2HhYDRBYv5WXcMTuCMY7LbfuV13dD0VcPiYuirF1HburoKU6zRWflhk1PIaqlUws3byaQl6VEdmsWzIcguLqJEQhvrtTPsLIubPRbroFLf0j_zSZm0F7i6Qa11mYE9W1e-CqHyu_cCBGz3rRI2S-cgIJtLpNu29Uh5YfYt4dqtimySQRtpwHCwVGGlo5ak" />
                </div>
                <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                  <img alt="Candy 3" className="w-20 h-20 md:w-32 md:h-32 object-contain drop-shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2IMzQwX9lXE7rqo3iV72TmGhu-o1cWogjbR6XZrB0SML463sDAKj6pp5M6IKRe1auNnZF1YJz3NArJ1sJOmY7kb_cNujEg04cLPUSaTn6Xb7ccYElooL9RIwNbXDhteomFwTigmH96HnlrxLkhco0NPSFk6-MTPM7BPkUJgotc1Us2HKGxQCWX672_7bJce6fAawAHGxZ7Rijj_-VNB-q1qP8-YuxRDwhpubF2a4Hg8tRag8ilhk2iF-kxLdW7FOFNaPGDHmYMEA" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant border-dashed">
              <Lightbulb className="text-primary shrink-0" size={24} />
              <p className="font-body text-base text-on-surface-variant">Gợi ý: Bé dùng ngón tay trỏ, ngón giữa và ngón áp út để chỉ số 3 trong ngôn ngữ ký hiệu nhé!</p>
            </div>
          </div>
        </div>

        {/* Options Area */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-body text-sm font-semibold text-on-surface-variant px-2 tracking-wider">CHỌN ĐÁP ÁN ĐÚNG</p>
            <form id="quizForm" className="flex flex-col gap-4" onSubmit={handleSubmit}>
              
              {["2", "3", "5"].map((val, idx) => (
                <label key={val} className="relative group cursor-pointer block">
                  <input 
                    name="answer" 
                    type="radio" 
                    value={val} 
                    className="peer sr-only" 
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    checked={selectedAnswer === val}
                  />
                  <div className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md active:scale-95
                    ${selectedAnswer === val 
                      ? (status === "success" && val === "3" ? "border-tertiary bg-tertiary-fixed" : "border-primary bg-primary-fixed") 
                      : "border-outline-variant bg-surface-container-lowest"}
                  `}>
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-full font-headline text-2xl font-bold transition-colors
                        ${selectedAnswer === val ? "bg-primary-fixed-dim" : "bg-surface-container-high group-hover:bg-primary-fixed-dim"}
                      `}>
                        {["A", "B", "C"][idx]}
                      </div>
                      <span className="font-math text-4xl font-medium">{val}</span>
                    </div>
                    {(selectedAnswer === val && (status === "idle" || status === "success")) && (
                      <CheckCircle2 className={`w-8 h-8 ${status === "success" ? "text-tertiary" : "text-primary"}`} />
                    )}
                  </div>
                </label>
              ))}

              <button 
                type="submit"
                className={`w-full mt-4 py-4 font-headline text-xl font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 active:translate-y-1 shadow-sm hover:shadow-lg
                  ${status === "success" ? "bg-tertiary-container text-on-tertiary-container" : "bg-primary-container text-on-primary-container hover:bg-primary hover:text-white"}
                  ${status === "error" ? "animate-shake bg-surface-variant text-on-surface" : ""}
                `}
              >
                {status === "success" ? "CHÍNH XÁC! 🎉" : status === "error" ? "THỬ LẠI NHÉ! 🧸" : "NỘP BÀI"}
                {status === "idle" && <Send />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-tertiary-container flex items-center justify-center shrink-0">
            <Trophy className="text-on-tertiary-container" size={28} />
          </div>
          <div>
            <h3 className="font-body text-sm font-bold text-on-surface mb-1">Đạt Huy Chương</h3>
            <p className="text-sm text-on-surface-variant">Hoàn thành 10 câu đúng để nhận huy chương Bé Giỏi Toán!</p>
          </div>
        </div>
        
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
            <Timer className="text-on-secondary-container" size={28} />
          </div>
          <div>
            <h3 className="font-body text-sm font-bold text-on-surface mb-1">Không Giới Hạn</h3>
            <p className="text-sm text-on-surface-variant">Bé hãy cứ thong thả suy nghĩ, không cần vội vàng đâu.</p>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary-fixed-dim flex items-center justify-center shrink-0">
            <Video className="text-on-primary-fixed" size={28} />
          </div>
          <div>
            <h3 className="font-body text-sm font-bold text-on-surface mb-1">Ngôn Ngữ Ký Hiệu</h3>
            <p className="text-sm text-on-surface-variant">Học toán kết hợp cùng ký hiệu ASL/Viasl sinh động.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
