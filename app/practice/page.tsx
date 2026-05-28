export default function Practice() {
  return (
    <div className="px-4 md:px-16 py-12 md:py-20 max-w-[1280px] mx-auto fade-in">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-primary mb-6">Ôn Tập Toán Học</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-body text-xl">
          Thực hành các bài tập để nâng cao kỹ năng toán học của bạn thông qua các trò chơi vui nhộn và thú vị.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((lesson) => (
          <div key={lesson} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 group-hover:scale-105 transition-transform"></div>
            <h3 className="font-headline text-xl font-bold text-primary mb-2">Bài Tập {lesson}</h3>
            <p className="font-body text-sm text-on-surface-variant mb-4">
              Luyện tập các kỹ năng toán học cơ bản
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-on-primary font-bold py-2 rounded-lg hover:brightness-110 transition-all">
                Bắt Đầu
              </button>
              <button className="flex-1 bg-surface-container text-on-surface font-bold py-2 rounded-lg hover:bg-surface-container-highest transition-all">
                Xem Trước
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
