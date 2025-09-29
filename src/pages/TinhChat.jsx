import TOC from '../components/TOC'
import WaveHero from '../components/WaveHero'

export default function TinhChat() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[1fr,280px] gap-8">
      <article className="prose prose-slate">
        <WaveHero title="3. Tính chất của ý thức xã hội" subtitle="Các đặc điểm cốt lõi trong tiến trình lịch sử." />
        <img className="w-full rounded-xl border" src="/svg/attributes.svg" alt="Tính chất ý thức xã hội" />
        <ul>
          <li><strong>Tính giai cấp:</strong> Trong xã hội có giai cấp, ý thức xã hội mang dấu ấn lợi ích giai cấp.</li>
          <li><strong>Tính lịch sử:</strong> Gắn với điều kiện tồn tại xã hội trong mỗi thời kỳ.</li>
          <li><strong>Tính kế thừa:</strong> Tư tưởng cũ có thể được tiếp thu và biến đổi.</li>
        </ul>
      </article>
      <TOC />
    </div>
  )
}
