import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const defaultCosts = {
  housing: 30,
  food: 25,
  education: 25,
  entertainment: 20,
}

export default function ChartSection() {
  const [income, setIncome] = useState(() => {
    const v = localStorage.getItem('income')
    return v ? Number(v) : 60
  })
  const [costs, setCosts] = useState(() => {
    const v = localStorage.getItem('costs')
    return v ? JSON.parse(v) : defaultCosts
  })

  useEffect(() => {
    localStorage.setItem('income', String(income))
  }, [income])

  useEffect(() => {
    localStorage.setItem('costs', JSON.stringify(costs))
  }, [costs])

  const total = useMemo(() => Object.values(costs).reduce((a, b) => a + b, 0), [costs])
  const remaining = useMemo(() => Math.max(0, income - total), [income, total])

  const data = useMemo(() => ({
    labels: ['Nhà ở', 'Ăn uống', 'Giáo dục', 'Giải trí', 'Còn lại'],
    datasets: [
      {
        label: '%',
        data: [costs.housing, costs.food, costs.education, costs.entertainment, remaining],
        backgroundColor: [
          '#60a5fa',
          '#93c5fd',
          '#bfdbfe',
          '#1e40af',
          '#22c55e'
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  }), [costs, remaining])

  const handleSlider = (key) => (e) => {
    const value = Number(e.target.value)
    setCosts((prev) => ({ ...prev, [key]: value }))
  }

  const sliderItems = [
    { key: 'housing', label: 'Nhà ở', icon: '🏠', color: 'from-blue-400 to-blue-500' },
    { key: 'food', label: 'Ăn uống', icon: '🍽️', color: 'from-blue-300 to-blue-400' },
    { key: 'education', label: 'Giáo dục', icon: '📚', color: 'from-blue-200 to-blue-300' },
    { key: 'entertainment', label: 'Giải trí', icon: '🎮', color: 'from-blue-700 to-blue-800' },
  ]

  return (
    <motion.section 
      id="chart" 
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
          <motion.span
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 bg-clip-text text-transparent bg-[length:200%_100%]"
          >
            Áp lực chi phí hàng tháng
          </motion.span>
        </h2>
        <p className="text-slate-600">Điều chỉnh tham số để quan sát tác động của chi phí đến phần còn lại.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                💰 <span>Thu nhập tổng</span>
              </label>
              <motion.span 
                className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 border border-blue-200"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                0–100
              </motion.span>
            </div>
            <motion.input
              type="range"
              min={0}
              max={100}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full accent-blue-600"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.div 
              className="text-sm text-slate-600 mt-2"
              key={income}
              initial={{ scale: 1.1, color: "#2563eb" }}
              animate={{ scale: 1, color: "#475569" }}
              transition={{ duration: 0.3 }}
            >
              Thu nhập: <span className="font-medium text-slate-800">{income}</span>
            </motion.div>
          </motion.div>

          {sliderItems.map((item, idx) => (
            <motion.div 
              key={item.key} 
              className="mb-6 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 + 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  {item.label} (%)
                </label>
                <motion.span 
                  className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded"
                  key={costs[item.key]}
                  initial={{ scale: 1.2, backgroundColor: "#3b82f6", color: "#ffffff" }}
                  animate={{ scale: 1, backgroundColor: "#f1f5f9", color: "#334155" }}
                  transition={{ duration: 0.4 }}
                >
                  {costs[item.key]}%
                </motion.span>
              </div>
              <motion.input
                type="range"
                min={0}
                max={100}
                value={costs[item.key]}
                onChange={handleSlider(item.key)}
                className="w-full accent-blue-600"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.div 
                className={`mt-1 h-2 rounded-full bg-gradient-to-r ${item.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${costs[item.key]}%` }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              />
            </motion.div>
          ))}

          <motion.div 
            className="space-y-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700 flex items-center justify-between"
              whileHover={{ backgroundColor: "#f8fafc", scale: 1.01 }}
            >
              <span>Tổng chi</span>
              <motion.span 
                className="font-semibold"
                key={total}
                animate={{ scale: [1.2, 1], color: ["#dc2626", "#374151"] }}
                transition={{ duration: 0.3 }}
              >
                {total}%
              </motion.span>
            </motion.div>
            <motion.div 
              className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 flex items-center justify-between"
              whileHover={{ backgroundColor: "#ecfdf5", scale: 1.01 }}
            >
              <span>Còn lại</span>
              <motion.span 
                className="font-semibold"
                key={remaining}
                animate={{ scale: [1.3, 1], color: remaining > 20 ? ["#16a34a", "#059669"] : ["#dc2626", "#b91c1c"] }}
                transition={{ duration: 0.4 }}
              >
                {remaining}%
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex items-center justify-center"
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, rotateY: 5 }}
        >
          <motion.div 
            className="w-full max-w-sm"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <Pie data={data} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
