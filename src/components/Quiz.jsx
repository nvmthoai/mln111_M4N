import { useEffect, useMemo, useState } from 'react'

const defaultAnswers = [3, 3, 3, 3, 3]

const questions = [
  'Hôn nhân nên là quyết định khi đã ổn định tài chính.',
  'Áp lực chi phí nuôi dạy con là rào cản lớn.',
  'Sự nghiệp cá nhân cần ưu tiên trước khi kết hôn.',
  'Hỗ trợ xã hội (nhà ở, giáo dục, y tế) ảnh hưởng lớn đến ý định sinh con.',
  'Tự do cá nhân và trải nghiệm quan trọng hơn kết hôn sớm.',
]

export default function Quiz() {
  const [answers, setAnswers] = useState(() => {
    const v = localStorage.getItem('quiz_answers')
    return v ? JSON.parse(v) : defaultAnswers
  })
  const [submitted, setSubmitted] = useState(() => localStorage.getItem('quiz_submitted') === '1')

  useEffect(() => {
    localStorage.setItem('quiz_answers', JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    localStorage.setItem('quiz_submitted', submitted ? '1' : '0')
  }, [submitted])

  const avg = useMemo(() => answers.reduce((a, b) => a + b, 0) / answers.length, [answers])

  const classification = useMemo(() => {
    if (avg >= 4) return { label: 'Trì hoãn', color: 'bg-yellow-50 text-yellow-800 border-yellow-200' }
    if (avg >= 2.75) return { label: 'Cân nhắc', color: 'bg-blue-50 text-blue-800 border-blue-200' }
    return { label: 'Sẵn sàng', color: 'bg-pink-50 text-pink-800 border-pink-200' }
  }, [avg])

  const handleChange = (idx) => (e) => {
    const v = Number(e.target.value)
    setAnswers((prev) => prev.map((val, i) => (i === idx ? v : val)))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="quiz" className="">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-700">Quiz: Thái độ với hôn nhân</h2>
        <p className="text-slate-600">Đánh giá mức độ đồng ý (1–5). 1 = không đồng ý, 5 = hoàn toàn đồng ý.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="">
            <label className="block text-slate-800 font-medium mb-2">{idx + 1}. {q}</label>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={answers[idx]}
              onChange={handleChange(idx)}
              className="w-full accent-blue-600"
            />
            <div className="text-sm text-slate-600">Mức độ: {answers[idx]}</div>
          </div>
        ))}

        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow">
            Tính điểm
          </button>
          {submitted && (
            <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${classification.color}`}>
              <span className="h-2 w-2 rounded-full bg-current" />
              Kết quả: {classification.label} (TB: {avg.toFixed(2)})
            </span>
          )}
        </div>
      </form>
    </section>
  )
}
