import { motion } from 'framer-motion'
import TOC from '../components/TOC'
import WaveHero from '../components/WaveHero'

export default function YThucXaHoi() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[1fr,280px] gap-8"
    >
      <motion.article 
        className="prose prose-slate"
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
          <WaveHero title="1. Ý THỨC XÃ HỘI" subtitle="Khái niệm nền tảng về mặt tinh thần của đời sống xã hội." />
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
          <p>
            <motion.strong 
              whileHover={{ 
                scale: 1.05, 
                color: "#2563eb",
                textShadow: "0 0 8px rgba(37, 99, 235, 0.3)"
              }}
              className="cursor-pointer"
            >
              Khái niệm:
            </motion.strong> Ý thức xã hội là mặt tinh thần của đời sống xã hội, là bộ phận hợp thành của văn hóa tinh thần của xã hội. Văn hóa tinh thần của xã hội mang nặng dấu ấn đặc trưng của hình thái kinh tế - xã hội, của các giai cấp đã tạo ra nó.
          </p>
        </motion.div>
        
        <motion.blockquote
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15)"
          }}
          className="relative cursor-pointer"
        >
          <motion.div
            className="absolute -left-4 top-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          "Tồn tại xã hội quyết định ý thức xã hội, nhưng ý thức xã hội có tính độc lập tương đối."
          
          <motion.div
            className="absolute top-2 right-2 text-blue-400"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💭
          </motion.div>
        </motion.blockquote>
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
