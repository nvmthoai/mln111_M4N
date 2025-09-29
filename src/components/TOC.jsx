import { NavLink } from 'react-router-dom'

export default function TOC() {
  const links = [
    { to: '/y-thuc-xa-hoi', label: '1. Ý thức xã hội' },
    { to: '/ket-cau', label: '2. Kết cấu' },
    { to: '/tinh-chat', label: '3. Tính chất' },
    { to: '/quan-he', label: '4. Quan hệ với tồn tại xã hội' },
  ]
  return (
    <aside className="sticky top-16 self-start w-full md:w-72">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Mục lục</div>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({isActive})=>`px-3 py-2 rounded-lg text-sm ${isActive? 'bg-blue-50 text-blue-700 font-medium':'hover:bg-slate-50 text-slate-700'}`}>{l.label}</NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}
