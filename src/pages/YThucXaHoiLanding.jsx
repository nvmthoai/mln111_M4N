import { motion } from 'framer-motion'

export default function YThucXaHoiLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Ý THỨC XÃ HỘI
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-4 max-w-4xl mx-auto leading-relaxed">
              Khám phá mặt tinh thần của đời sống xã hội qua lăng kính 
              <span className="font-semibold text-blue-700"> Chủ nghĩa Duy vật Lịch sử (MLN)</span>
            </p>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              Hiểu rõ tại sao thế hệ trẻ ngày nay ngại kết hôn và sinh con thông qua mối quan hệ biện chứng giữa 
              <a href="/quan-he"><strong> tồn tại xã hội</strong> và <strong>ý thức xã hội</strong></a>
            </p>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200/30 rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200/30 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.section>

      {/* Quick Overview Cards */}
      <motion.section 
        className="py-16 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">Khái niệm cơ bản</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ý thức xã hội là mặt tinh thần của đời sống xã hội, phản ánh điều kiện tồn tại vật chất và có tác động ngược lại.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Mối quan hệ biện chứng</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tồn tại xã hội quyết định ý thức xã hội, nhưng ý thức xã hội cũng có tính độc lập tương đối và tác động ngược lại.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">💒</div>
              <h3 className="text-xl font-bold text-indigo-800 mb-3">Ứng dụng thực tiễn</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Giải thích xu hướng trì hoãn hôn nhân của giới trẻ qua áp lực kinh tế và sự thay đổi quan niệm.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Interactive Story Book */}
      <motion.section 
        className="py-20 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              📚 Câu chuyện tương tác
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Khám phá 10 câu chuyện thực tế minh họa cho lý thuyết MLN về vấn đề hôn nhân - gia đình hiện đại
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Concepts Section */}
      <motion.section 
        className="py-20 px-4 bg-white/30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center text-slate-800 mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            🎯 Những điểm chính cần nhớ
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏛️",
                title: "7 Hình thái ý thức",
                content: "Chính trị, Pháp quyền, Đạo đức, Tôn giáo, Thẩm mỹ, Khoa học, Triết học",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: "📊",
                title: "2 Trình độ phản ánh", 
                content: "Ý thức xã hội thông thường và Ý thức lý luận",
                color: "from-green-500 to-green-600"
              },
              {
                icon: "⚡",
                title: "3 Tính chất",
                content: "Tính giai cấp, Tính lịch sử, Tính kế thừa",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: "🔄",
                title: "Mối quan hệ biện chứng",
                content: "Tồn tại quyết định ý thức, nhưng ý thức cũng tác động ngược lại",
                color: "from-orange-500 to-orange-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-3 text-lg">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl text-white shadow-2xl"
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn sàng khám phá thêm?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tìm hiểu về các chương khác của lý thuyết MLN và ứng dụng vào đời sống
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              🏠 Về trang chủ
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
