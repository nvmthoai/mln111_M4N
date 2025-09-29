import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700">Vì sao thế hệ trẻ ngày nay ngại kết hôn và sinh con?</h1>
        <p className="mt-3 text-slate-600">Khám phá theo từng mục: khái niệm, kết cấu, tính chất và quan hệ với tồn tại xã hội.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" to="/y-thuc-xa-hoi">1. Ý thức xã hội</Link>
          <Link className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50" to="/ket-cau">2. Kết cấu</Link>
          <Link className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50" to="/tinh-chat">3. Tính chất</Link>
          <Link className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-50" to="/quan-he">4. Quan hệ với tồn tại xã hội</Link>
        </div>
      </div>
    </div>
  )
}
