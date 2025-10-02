import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function WaveHero({ title, subtitle, children }) {
  const [displayedTitle, setDisplayedTitle] = useState('')
  
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < title.length) {
        setDisplayedTitle(title.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 80)
    
    return () => clearInterval(timer)
  }, [title])

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white mb-8"
    >
      {/* Animated floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20 blur-sm"
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-6 left-8 w-12 h-12 rounded-full bg-white/15 blur-sm"
      />
      
      <motion.div
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 right-1/3 w-8 h-8 border-2 border-white/30 rounded-full"
      />

      {/* Wave SVG */}
      <svg className="absolute inset-x-0 -bottom-10 w-full" viewBox="0 0 1440 150" fill="none">
        <motion.path 
          d="M0 60C200 120 400 120 600 90C800 60 1000 0 1200 0C1300 0 1400 10 1440 20V150H0V60Z" 
          fill="rgba(255,255,255,0.15)"
          animate={{
            d: [
              "M0 60C200 120 400 120 600 90C800 60 1000 0 1200 0C1300 0 1400 10 1440 20V150H0V60Z",
              "M0 80C200 40 400 40 600 70C800 100 1000 80 1200 80C1300 80 1400 90 1440 100V150H0V80Z",
              "M0 60C200 120 400 120 600 90C800 60 1000 0 1200 0C1300 0 1400 10 1440 20V150H0V60Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      <div className="relative px-6 py-12 md:px-10 md:py-16">
        <motion.h1 
          className="text-2xl md:text-4xl font-extrabold m-0 mb-2 text-slate-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {displayedTitle}
          <motion.span 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="opacity-90 mb-4"
          >
            {subtitle}
          </motion.p>
        )}
        
        {children && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
