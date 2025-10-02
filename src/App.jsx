import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import YThucXaHoi from './pages/YThucXaHoi'
import YThucXaHoiLanding from './pages/YThucXaHoiLanding'
import KetCau from './pages/KetCau'
import TinhChat from './pages/TinhChat'
import QuanHe from './pages/QuanHe'

import LifeChoicesGame from './components/LifeChoicesGame'
import ChatBot from './components/ChatBot'

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero + sections */}
            <div className="relative min-h-[50vh] bg-gradient-to-b from-blue-50 via-slate-50 to-white overflow-hidden">
              {/* Animated background elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-200/20 rounded-full blur-2xl"
              />
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  <motion.h1 
                    className="text-3xl md:text-6xl font-extrabold"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Vì sao giới trẻ ngại kết hôn và sinh con?
                    </span>
                  </motion.h1>
                  
                  <motion.p 

                    className="mt-4 text-slate-600 max-w-4xl mx-auto text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Khám phá <motion.strong 
                      whileHover={{ scale: 1.05, color: "#2563eb" }}
                      className="cursor-pointer"
                    >mối liên hệ biện chứng</motion.strong> giữa tồn tại xã hội và ý thức xã hội qua biểu đồ tương tác và trò chơi mô phỏng cuộc sống.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-8 flex flex-wrap justify-center gap-4"
                  >
                    <motion.a 
                      href="/y-thuc-xa-hoi"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-lg"
                    >
                    
                      Khám phá ngay <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </motion.a>
                    <motion.a 
                      href="#game"
                      whileHover={{ scale: 1.05, borderColor: "#2563eb", backgroundColor: "#f8fafc" }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-slate-700 font-semibold"
                    >
                      🎮 Chơi game
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16">
              {/* Theory cards with stagger animation */}
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
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
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Cơ sở lý thuyết</h2>
                  <p className="text-slate-600 text-lg">Ba khái niệm chính giúp lý giải hành vi xã hội</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Ý thức xã hội',
                      desc: 'Quan điểm, giá trị, kỳ vọng về hôn nhân – chịu tác động của điều kiện sống và trải nghiệm.',
                      icon: '🧠',
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      title: 'Tồn tại xã hội',
                      desc: 'Thu nhập, chi phí nhà ở – giáo dục – y tế, cơ hội việc làm… tạo áp lực vật chất.',
                      icon: '🏙️',
                      color: 'from-indigo-500 to-indigo-600'
                    },
                    {
                      title: 'Mối quan hệ biện chứng',
                      desc: 'Tồn tại xã hội quyết định ý thức xã hội; ý thức có thể tác động ngược để cải biến hiện thực.',
                      icon: '⚖️',
                      color: 'from-purple-500 to-purple-600'
                    },
                  ].map((c, idx) => (
                    <motion.div
                      key={c.title}
                      variants={{
                        hidden: { opacity: 0, y: 50, rotateY: -15 },
                        visible: { opacity: 1, y: 0, rotateY: 0 }
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        rotateY: 5,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                      }}
                      className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-8 shadow-sm cursor-pointer"
                    >
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      />
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                        className="text-4xl mb-4"
                      >
                        {c.icon}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{c.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{c.desc}</p>
                      
                      <motion.div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                        initial={false}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

             

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <LifeChoicesGame />
              </motion.div>
            </main>
          </motion.div>
        } />
        
        <Route path="/y-thuc-xa-hoi" element={
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <YThucXaHoiLanding />
          </motion.div>
        } />
        
        <Route path="/y-thuc-xa-hoi-detail" element={
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <YThucXaHoi />
          </motion.div>
        } />
        
        <Route path="/ket-cau" element={
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <KetCau />
          </motion.div>
        } />
        
        <Route path="/tinh-chat" element={
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <TinhChat />
          </motion.div>
        } />
        
        <Route path="/quan-he" element={
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <QuanHe />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-50 bg-white/95 border-b backdrop-blur-sm supports-[backdrop-filter]:bg-white/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink to="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MLN • Chủ đề xã hội
              </NavLink>
            </motion.div>
            
            <div className="flex gap-6 text-sm">
              {[
                { to: '/y-thuc-xa-hoi', label: 'Ý thức xã hội' },
                { to: '/ket-cau', label: 'Kết cấu' },
                { to: '/tinh-chat', label: 'Tính chất' },
                { to: '/quan-he', label: 'Quan hệ' }
              ].map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  <NavLink 
                    to={link.to}
                    className={({isActive}) => `
                      relative px-3 py-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'text-blue-700 font-semibold bg-blue-50' 
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                      }
                    `}
                  >
                    {({isActive}) => (
                      <>
                        {link.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.nav>

        <AnimatedRoutes />

        {/* ChatBot Component */}
        <ChatBot />

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t bg-white/80 mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
            <motion.blockquote 
              className="text-slate-600 italic text-lg"
              whileInView={{ scale: [0.98, 1, 0.98] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "Theo quan điểm triết học Mác–Lênin: tồn tại xã hội quyết định ý thức xã hội".
            </motion.blockquote>
          </div>
        </motion.footer>
      </div>
    </BrowserRouter>
  )
}

export default App
