import TOC from '../components/TOC'
import WaveHero from '../components/WaveHero'

export default function KetCau() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[1fr,280px] gap-8">
      <article className="prose prose-slate">
        <WaveHero title="2. Kết cấu của ý thức xã hội" subtitle="Theo lĩnh vực tư tưởng và theo trình độ phản ánh." />
        <img className="w-full rounded-xl border" src="/svg/structure.svg" alt="Kết cấu ý thức xã hội" />
        <h2>a) Theo lĩnh vực tư tưởng</h2>
        <ul>
          <li>🗳️ <strong>Ý thức chính trị:</strong> Phản ánh các mối quan hệ kinh tế... và quyền lực nhà nước.</li>
          <li>⚖️ <strong>Ý thức pháp quyền:</strong> Quan niệm về bản chất và vai trò của pháp luật...</li>
          <li>🤝 <strong>Ý thức đạo đức:</strong> Quan niệm về thiện/ác, chuẩn mực ứng xử...</li>
          <li>⛪ <strong>Ý thức tôn giáo:</strong> Sự phản ánh hư ảo...</li>
          <li>🎨 <strong>Ý thức thẩm mỹ:</strong> Giá trị nghệ thuật mang tính nhân loại.</li>
          <li>🔬 <strong>Ý thức khoa học:</strong> Tri thức chân thực về bản chất và quy luật.</li>
          <li>📚 <strong>Triết học:</strong> Hạt nhân lý luận cao nhất.</li>
        </ul>
        <h2>b) Theo trình độ phản ánh</h2>
        <ul>
          <li>🧭 <strong>Ý thức xã hội thông thường:</strong> Kinh nghiệm, tâm lý xã hội, dư luận…</li>
          <li>🏛️ <strong>Ý thức lý luận:</strong> Hệ thống quan điểm, học thuyết có tính khái quát hơn.</li>
        </ul>
      </article>
      <TOC />
    </div>
  )
}
