import { motion } from 'framer-motion'
import TOC from '../components/TOC'
import WaveHero from '../components/WaveHero'
import StoryBook from '../components/StoryBook'

export default function YThucXaHoi() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[1fr,280px] gap-8"
    >
      <motion.article 
        className="prose prose-slate max-w-none"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <WaveHero title="I. Ý THỨC XÃ HỘI" subtitle="Mặt tinh thần của đời sống xã hội trong lý thuyết MLN" />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
            visible: { opacity: 1, scale: 1, rotateY: 0 }
          }}
          whileHover={{ scale: 1.02, rotateY: 2 }}
          className="overflow-hidden rounded-xl"
        >
          <img className="w-full border" src="/svg/awareness.svg" alt="Minh hoạ ý thức xã hội" />
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <p className="text-lg leading-relaxed">
            <motion.strong 
              whileHover={{ 
                scale: 1.05, 
                color: "#2563eb",
                textShadow: "0 0 8px rgba(37, 99, 235, 0.3)"
              }}
              className="cursor-pointer"
            >
              Khái niệm ý thức xã hội:
            </motion.strong> Ý thức xã hội là mặt tinh thần của đời sống xã hội, là bộ phận hợp thành của văn hóa tinh thần của xã hội. Văn hóa tinh thần của xã hội mang nặng dấu ấn đặc trưng của hình thái kinh tế - xã hội, của các giai cấp đã tạo ra nó.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-2xl font-bold text-blue-700 mb-6">1. Kết cấu của ý thức xã hội</h2>
          
          <h3 className="text-xl font-semibold text-blue-600 mb-4">a) Theo lĩnh vực tư tưởng:</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <motion.div 
              className="bg-blue-50 p-5 rounded-lg border border-blue-200"
              whileHover={{ scale: 1.02, backgroundColor: "#dbeafe" }}
            >
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                🏛️ Ý thức chính trị
              </h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                Phản ánh các mối quan hệ kinh tế của xã hội bằng ngôn ngữ chính trị cũng như mối quan hệ giữa các giai cấp, các dân tộc, các quốc gia và thái độ của các giai cấp đối với quyền lực nhà nước.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-green-50 p-5 rounded-lg border border-green-200"
              whileHover={{ scale: 1.02, backgroundColor: "#dcfce7" }}
            >
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                ⚖️ Ý thức pháp quyền
              </h4>
              <p className="text-sm text-green-700 leading-relaxed">
                Toàn bộ những tư tưởng, quan điểm của một giai cấp về bản chất và vai trò của pháp luật, về quyền, trách nhiệm và nghĩa vụ của nhà nước, của các tổ chức xã hội và của công dân, về tính hợp pháp và không hợp pháp của hành vi con người trong xã hội.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 p-5 rounded-lg border border-purple-200"
              whileHover={{ scale: 1.02, backgroundColor: "#f3e8ff" }}
            >
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                💝 Ý thức đạo đức
              </h4>
              <p className="text-sm text-purple-700 leading-relaxed">
                Là toàn bộ những quan niệm về thiện, ác, tốt, xấu, lương tâm, trách nhiệm, nghĩa vụ, công bằng, hạnh phúc, v.v. và về những quy tắc đánh giá, những chuẩn mực điều chỉnh hành vi cùng cách ứng xử giữa các cá nhân với nhau và giữa các cá nhân với xã hội.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-orange-50 p-5 rounded-lg border border-orange-200"
              whileHover={{ scale: 1.02, backgroundColor: "#fed7aa" }}
            >
              <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                🙏 Ý thức tôn giáo
              </h4>
              <p className="text-sm text-orange-700 leading-relaxed">
                Tôn giáo là sự phản ánh hư ảo sức mạnh của giới tự nhiên bên ngoài lẫn các quan hệ xã hội vào đầu óc con người.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-pink-50 p-5 rounded-lg border border-pink-200"
              whileHover={{ scale: 1.02, backgroundColor: "#fce7f3" }}
            >
              <h4 className="font-semibold text-pink-800 mb-3 flex items-center gap-2">
                🎨 Ý thức thẩm mỹ (nghệ thuật)
              </h4>
              <p className="text-sm text-pink-700 leading-relaxed">
                Có những yếu tố mang tính toàn nhân loại, do vậy mà nhiều nền nghệ thuật, nhiều tác phẩm nghệ thuật, nhiều giá trị văn hóa vật thể và phi vật thể ở các giai đoạn lịch sử khác nhau, của các tác giả thuộc các giai cấp và các dân tộc khác nhau đã trở thành những giá trị văn hóa chung tiêu biểu, trường tồn và vô giá của nhân loại.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-indigo-50 p-5 rounded-lg border border-indigo-200"
              whileHover={{ scale: 1.02, backgroundColor: "#e0e7ff" }}
            >
              <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                🔬 Ý thức khoa học
              </h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Là sự khái quát cao nhất của thực tiễn, là phương thức nắm bắt tất cả các hiện tượng của hiện thực, cung cấp những tri thức chân thực về bản chất, các hiện tượng, các quá trình và các quy luật tự nhiên và của xã hội.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              🧠 Triết học (là hạt nhân lý luận cao nhất)
            </h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              Hình thái ý thức triết học và khoa học là những ý thức xã hội lý luận. Hơn nữa, các ngành khoa học riêng lẻ nghiên cứu thế giới từ các khía cạnh, từ những mặt nhất định của thế giới đó.
            </p>
          </motion.div>

          <h3 className="text-xl font-semibold text-blue-600 mb-4">b) Theo trình độ phản ánh:</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <motion.div 
              className="bg-yellow-50 p-5 rounded-lg border border-yellow-200"
              whileHover={{ scale: 1.02, backgroundColor: "#fefce8" }}
            >
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                🌱 Ý thức xã hội thông thường
              </h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                Kinh nghiệm, thói quen, tâm lý xã hội, dư luận…
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 p-5 rounded-lg border border-blue-200"
              whileHover={{ scale: 1.02, backgroundColor: "#dbeafe" }}
            >
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                🎓 Ý thức lý luận
              </h4>
              <p className="text-sm text-blue-700 leading-relaxed">
                Hệ thống quan điểm, học thuyết, tư tưởng có tính khái quát và khoa học hơn
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-2xl font-bold text-blue-700 mb-6">2. Tính chất của ý thức xã hội</h2>
          
          <div className="space-y-4 mb-8">
            <motion.div 
              className="bg-red-50 p-5 rounded-lg border border-red-200"
              whileHover={{ scale: 1.02, backgroundColor: "#fef2f2" }}
            >
              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                👥 Tính giai cấp
              </h4>
              <p className="text-sm text-red-700 leading-relaxed">
                Trong xã hội có giai cấp, ý thức xã hội luôn mang dấu ấn lợi ích giai cấp.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-green-50 p-5 rounded-lg border border-green-200"
              whileHover={{ scale: 1.02, backgroundColor: "#dcfce7" }}
            >
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                ⏳ Tính lịch sử
              </h4>
              <p className="text-sm text-green-700 leading-relaxed">
                Ý thức xã hội gắn với điều kiện tồn tại xã hội trong mỗi thời kỳ.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-purple-50 p-5 rounded-lg border border-purple-200"
              whileHover={{ scale: 1.02, backgroundColor: "#f3e8ff" }}
            >
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                🔄 Tính kế thừa
              </h4>
              <p className="text-sm text-purple-700 leading-relaxed">
                Các tư tưởng, quan niệm cũ có thể được tiếp thu, biến đổi trong thời kỳ mới.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-2xl font-bold text-blue-700 mb-6">II. Vận dụng vào vấn đề hôn nhân – gia đình hiện nay</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Tồn tại xã hội */}
            <motion.div
              className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200"
              whileHover={{ scale: 1.02, shadow: "0 10px 30px rgba(251, 146, 60, 0.15)" }}
            >
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                🏠 a) Tồn tại xã hội (điều kiện khách quan)
              </h3>
              
              <div className="space-y-4 text-sm">
                <p className="text-orange-700 leading-relaxed">
                  <strong>Khái niệm:</strong> Tồn tại xã hội là toàn bộ điều kiện vật chất, đời sống kinh tế, sinh hoạt hàng ngày của con người (ví dụ: trình độ sản xuất, quan hệ lao động, điều kiện tự nhiên, môi trường sống…).
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-orange-800 mb-2">💰 Áp lực kinh tế, chi phí sinh hoạt, nhà ở, nuôi dạy con cao</h5>
                    <p className="text-orange-700 text-xs">
                      <strong>Ví dụ:</strong> Tại các thành phố lớn như Hà Nội, TP.HCM, chi phí thuê nhà, nuôi con, học phí, y tế rất cao → nhiều cặp đôi trẻ trì hoãn kết hôn hoặc quyết định không sinh con.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-orange-800 mb-2">🎯 Môi trường việc làm cạnh tranh</h5>
                    <p className="text-orange-700 text-xs">
                      <strong>Ví dụ:</strong> Nhiều người trẻ trong độ tuổi 25–30 tập trung làm việc, học thêm kỹ năng, tích lũy tài chính thay vì kết hôn sớm → độ tuổi kết hôn trung bình ở Việt Nam đã tăng từ 22–23 (trước đây) lên khoảng 27–29.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-orange-800 mb-2">🏙️ Công nghiệp hóa, đô thị hóa</h5>
                    <p className="text-orange-700 text-xs">
                      <strong>Ví dụ:</strong> Trước kia, ở nông thôn, kết hôn và sinh con là "chuẩn mực" vì gắn với gia đình – làng xã. Nay, trong các đô thị, giới trẻ sống tự lập, có mạng xã hội để giao lưu, giải trí → hôn nhân không còn là con đường duy nhất để tìm hạnh phúc.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ý thức xã hội */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
              whileHover={{ scale: 1.02, shadow: "0 10px 30px rgba(59, 130, 246, 0.15)" }}
            >
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                🧠 b) Ý thức xã hội (sự thay đổi trong quan niệm)
              </h3>
              
              <div className="space-y-4 text-sm">
                <p className="text-blue-700 leading-relaxed">
                  <strong>Khái niệm:</strong> Ý thức xã hội là những tư tưởng, quan điểm, tình cảm, phong tục, tôn giáo, triết học… phản ánh lại đời sống vật chất ấy.
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">💒 Hôn nhân là sự lựa chọn tự do</h5>
                    <p className="text-blue-700 text-xs">
                      <strong>Ví dụ:</strong> Nhiều người trẻ tuyên bố "kết hôn chỉ khi tìm được người phù hợp", hoặc lựa chọn sống độc thân hạnh phúc thay vì chịu áp lực "lấy chồng – lấy vợ cho bằng bạn bằng bè".
                    </p>
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">👶 Sinh con gắn với khả năng cá nhân</h5>
                    <p className="text-blue-700 text-xs">
                      <strong>Ví dụ:</strong> Một số cặp đôi trẻ tại TP.HCM hoặc Hà Nội quyết định "không sinh con" (childfree) để tập trung cho sự nghiệp, du lịch, tận hưởng cuộc sống.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 p-3 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2">⚖️ Tư tưởng đề cao tự do cá nhân, bình đẳng giới</h5>
                    <p className="text-blue-700 text-xs">
                      <strong>Ví dụ:</strong> Trước kia, phụ nữ thường bị coi "phải lấy chồng, sinh con" để tròn bổn phận. Nay, nhiều phụ nữ trẻ chủ động lựa chọn kết hôn muộn, hoặc chỉ kết hôn khi có sự nghiệp ổn định, và họ có quyền nói "không" với áp lực gia đình.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h3 className="text-xl font-bold text-purple-700 mb-6">c) Mối quan hệ biện chứng</h3>
          
          <div className="space-y-6">
            <motion.div 
              className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                ➡️ Tồn tại xã hội quyết định ý thức xã hội
              </h4>
              <p className="text-green-700 text-sm leading-relaxed mb-3">
                Xã hội sống trong điều kiện vật chất như thế nào thì sẽ hình thành tư tưởng, quan niệm tương ứng.
              </p>
              <div className="bg-white/60 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Ví dụ:</strong> Khi Việt Nam bước vào thời kỳ đổi mới (1986), kinh tế chuyển từ bao cấp sang thị trường định hướng XHCN. Sự thay đổi tồn tại xã hội này đã làm thay đổi ý thức xã hội: người dân cởi mở hơn với tư duy kinh doanh, hội nhập, sáng tạo.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                ⬅️ Ý thức xã hội tác động ngược lại tồn tại xã hội
              </h4>
              <p className="text-purple-700 text-sm leading-relaxed mb-3">
                Tư tưởng, quan điểm, lý luận đúng đắn có thể thúc đẩy xã hội tiến lên; ngược lại, tư tưởng lạc hậu có thể kìm hãm sự phát triển.
              </p>
              <div className="bg-white/60 p-4 rounded-lg">
                <p className="text-purple-800 text-sm">
                  <strong>Ví dụ:</strong> Ngược lại, những tư tưởng đổi mới, tư duy "dám nghĩ dám làm" cũng đã góp phần thúc đẩy kinh tế phát triển nhanh hơn.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                🔄 Tính độc lập tương đối của ý thức xã hội
              </h4>
              <p className="text-indigo-700 text-sm leading-relaxed mb-4">
                Ý thức xã hội không phải lúc nào cũng thay đổi ngay lập tức theo tồn tại xã hội, mà có độ trễ, sự đi trước hoặc tác động qua lại:
              </p>
              
              <div className="space-y-3">
                <div className="bg-white/60 p-3 rounded-lg">
                  <h5 className="font-semibold text-indigo-800 text-sm mb-2">⏰ Độ trễ:</h5>
                  <p className="text-indigo-700 text-xs mb-2">
                    Có khi tồn tại xã hội thay đổi rồi, nhưng tư tưởng, tập quán cũ vẫn tồn tại.
                  </p>
                  <p className="text-indigo-600 text-xs">
                    👉 <strong>Ví dụ:</strong> Dù xã hội hiện đại, nhưng nhiều người vẫn còn giữ những hủ tục mê tín.
                  </p>
                </div>
                
                <div className="bg-white/60 p-3 rounded-lg">
                  <h5 className="font-semibold text-indigo-800 text-sm mb-2">🚀 Đi trước:</h5>
                  <p className="text-indigo-700 text-xs mb-2">
                    Có khi tư tưởng vượt trước thực tế, mở đường cho sự thay đổi.
                  </p>
                  <p className="text-indigo-600 text-xs">
                    👉 <strong>Ví dụ:</strong> Trước khi nước ta thực hiện đổi mới 1986, trong Đảng đã có những tư tưởng cải cách đi trước để thúc đẩy sự chuyển đổi.
                  </p>
                </div>
                
                <div className="bg-white/60 p-3 rounded-lg">
                  <h5 className="font-semibold text-indigo-800 text-sm mb-2">🔗 Tác động qua lại giữa các hình thái ý thức xã hội:</h5>
                  <p className="text-indigo-700 text-xs mb-2">
                    Tôn giáo, pháp luật, triết học, nghệ thuật… không chỉ phản ánh đời sống xã hội, mà còn ảnh hưởng, bổ sung, hoặc kìm hãm nhau.
                  </p>
                  <p className="text-indigo-600 text-xs">
                    👉 <strong>Ví dụ:</strong> Tinh thần yêu nước trong văn học nghệ thuật có thể khơi dậy phong trào đấu tranh chính trị.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Book Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
          }}
          className="my-12"
        >
          <StoryBook />
        </motion.div>
      </motion.article>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <TOC />
      </motion.div>
    </motion.div>
  )
}
