import TOC from '../components/TOC'
import WaveHero from '../components/WaveHero'

export default function QuanHe() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[1fr,280px] gap-8">
      <article className="prose prose-slate">
        <WaveHero title="4. Quan hệ giữa ý thức xã hội và tồn tại xã hội" subtitle="Nguyên lý và tác động hai chiều." />
        <div className="not-prose rounded-xl border border-slate-200 bg-gradient-to-r from-blue-700 to-fuchsia-500 p-6 mb-6">
          <p className="text-lg font-semibold text-slate-50 mb-0"><strong>Tồn tại xã hội</strong> (đời sống vật chất, kinh tế, sinh hoạt xã hội) quyết định ý thức xã hội.</p>
          <p className="text-lg font-semibold text-slate-50 mb-0"><strong>Ý thức xã hội</strong> là những tư tưởng, quan điểm, tình cảm, phong tục, tôn giáo, triết học,... phản ánh lại đời sống vật chất.</p>
        </div>
        <div className="not-prose rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800">
          <strong>Kết luận:</strong> Ý thức xã hội có tính độc lập tương đối và có thể tác động trở lại tồn tại xã hội — thúc đẩy hoặc kìm hãm phát triển.
        </div>
        <h2>Tính độc lập tương đối của ý thức xã hội</h2>
        <ul>
          <li>Có thể lạc hậu so với tồn tại xã hội.</li>
          <li>Có thể vượt trước, dự báo tương lai.</li>
          <li>Các hình thái ý thức xã hội có tác động qua lại lẫn nhau.</li>
        
        </ul>
      </article>
      <TOC />
    </div>
  )
}
