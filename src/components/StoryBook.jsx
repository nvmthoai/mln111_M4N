import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const stories = [
    {
      id: 1,
      title: "Cảnh 1 – Khởi đầu tình yêu",
      content:
        "Lan và Minh, một đôi bạn trẻ ở tuổi đôi mươi, cùng nhau ngồi tại một quán ăn vỉa hè ở Sài Gòn. Hai người vừa ăn vừa cười nói vui vẻ, xung quanh là ánh đèn neon và dòng xe máy tấp nập.",
      image: "/story_1.png",
    },
    {
      id: 2,
      title: "Cảnh 2 – Căn hộ nhỏ",
      content:
        "Trong căn hộ thuê nhỏ bé, Lan và Minh ngồi ăn tối trên chiếc bàn thấp. Bữa cơm giản dị chỉ có cơm, rau và vài món đơn sơ, nhưng cả hai vẫn trò chuyện và cười đùa hạnh phúc.",
      image: "/story_2.png",
    },
    {
      id: 3,
      title: "Cảnh 3 – Tính toán tài chính",
      content:
        "Hai người ngồi trước bàn chất đầy hóa đơn, sổ ghi chép và máy tính cầm tay. Minh cẩn thận ghi số liệu, trong khi Lan trông đầy lo lắng. Không khí căng thẳng nhưng vẫn có sự đồng lòng.",
      image: "/story_3.png",
    },
    {
      id: 4,
      title: "Cảnh 4 – Tranh luận nhỏ",
      content:
        "Lan đứng bên cửa sổ, khoanh tay, khuôn mặt thoáng giận. Minh ngồi ở bàn, tỏ ra mệt mỏi. Giữa hai người có chút căng thẳng, không khí trong căn phòng trở nên nặng nề.",
      image: "/story_4.png",
    },
    {
      id: 5,
      title: "Cảnh 5 – Làm hòa",
      content:
        "Sau cuộc tranh luận, Lan và Minh ngồi cạnh nhau trên ghế sofa. Họ nắm tay và mỉm cười nhẹ nhàng, ánh đèn bàn tỏa ra cảm giác ấm áp và bình yên.",
      image: "/story_5.png",
    },
    {
      id: 6,
      title: "Cảnh 6 – Quyết định trì hoãn hôn nhân",
      content:
        "Lan và Minh nắm tay nhau đi dạo trên phố đi bộ Nguyễn Huệ vào lúc hoàng hôn. Cả hai nhìn nhau đầy thấu hiểu, cùng thống nhất rằng họ sẽ chờ đến khi điều kiện ổn định mới kết hôn.",
      image: "/story_6.png",
    },
    {
      id: 7,
      title: "Cảnh 7 – Làm việc chăm chỉ",
      content:
        "Lan chăm chú làm việc trên máy tính trong văn phòng, còn Minh lao động tại công trình xây dựng. Cả hai đều mệt mỏi nhưng ánh mắt toát lên sự kiên định và quyết tâm.",
      image: "/story_7.png",
    },
    {
      id: 8,
      title: "Cảnh 8 – Du lịch cùng nhau",
      content:
        "Hai người cùng nhau đi xe máy trên con đường miền Tây xanh mát. Lan ngồi sau Minh, ôm chặt, cả hai cùng cười rạng rỡ, xung quanh là những cánh đồng lúa trải dài.",
      image: "/story_8.png",
    },
    {
      id: 9,
      title: "Cảnh 9 – Ước mơ tương lai",
      content:
        "Lan và Minh ngồi trên nóc nhà, ngắm nhìn những tòa nhà sáng đèn của Sài Gòn về đêm. Họ trò chuyện về ước mơ, về một cuộc sống tốt đẹp hơn trong tương lai.",
      image: "/story_9.png",
    },
    {
      id: 10,
      title: "Cảnh 10 – Hy vọng",
      content:
        "Lan và Minh đứng trên cầu Thủ Thiêm, tay trong tay, nhìn về phía thành phố rực rỡ ánh đèn. Trong mắt họ ánh lên niềm hy vọng, tình yêu và sự kiên cường để vượt qua khó khăn.",
      image: "/story_10.png",
    },
  ];

  const nextPage = () => {
    if (currentPage < stories.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const goToPage = (pageIndex) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
      }, 300);
    }
  };

  const currentStory = stories[currentPage];

  return (
    <div className="max-w-6xl mx-auto p-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          📖 Câu chuyện Lan và Minh: Tình yêu thời hiện đại
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Câu chuyện của một đôi bạn trẻ Sài Gòn - từ tình yêu ban đầu đến quyết
          định trì hoãn hôn nhân để vượt qua khó khăn kinh tế và xây dựng tương
          lai
        </p>
      </motion.div>

      {/* Book Container */}
      <div
        className="relative mx-auto"
        style={{ width: "900px", height: "700px", perspective: "1200px" }}
      >
        {/* Book Background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl shadow-2xl"
          style={{ transform: "rotateY(-5deg)" }}
        />

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{
              rotateY: isFlipping ? 180 : 0,
              opacity: isFlipping ? 0 : 1,
            }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -180, opacity: 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              transformOrigin: "center left",
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Story page layout */}
            <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col">
              {/* Page Number */}
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg z-10">
                {currentPage + 1}/10
              </div>

              {/* Story Image */}
              <div className="flex-1 flex items-center justify-center mb-6">
                <motion.img
                  src={currentStory.image}
                  alt={currentStory.title}
                  className="max-w-full max-h-[400px] object-contain rounded-xl shadow-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              </div>

              {/* Story Content */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  {currentStory.title}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {currentStory.content}
                </p>
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-6">
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg border border-white/20"
                  whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
                >
                  ← Trang trước
                </motion.button>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage === stories.length - 1}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                  whileHover={{
                    scale: currentPage === stories.length - 1 ? 1 : 1.05,
                  }}
                  whileTap={{
                    scale: currentPage === stories.length - 1 ? 1 : 0.95,
                  }}
                >
                  Trang sau →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Book Binding */}
        <div className="absolute left-0 top-4 bottom-4 w-2 bg-gradient-to-b from-amber-600 to-orange-700 rounded-l-lg shadow-inner" />
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {stories.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentPage
                ? "bg-blue-600"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            disabled={isFlipping}
          />
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-12 mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
          💕 Thông điệp từ câu chuyện Lan và Minh
        </h3>
        <div className="text-center">
          <p className="text-lg text-blue-700 font-medium mb-4">
            "Tình yêu thật sự không chỉ là cảm xúc, mà còn là sự hiểu biết, kiên
            nhẫn và cùng nhau vượt qua khó khăn để xây dựng tương lai"
          </p>
          <p className="text-slate-600 italic">
            Qua câu chuyện của Lan và Minh, chúng ta thấy rằng thế hệ trẻ ngày
            nay không ngại kết hôn, mà họ muốn chuẩn bị kỹ càng để có một cuộc
            sống gia đình hạnh phúc và bền vững.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StoryBook;
