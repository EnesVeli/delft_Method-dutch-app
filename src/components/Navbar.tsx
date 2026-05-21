import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-[#FF9B00] hover:opacity-80 transition-opacity">
          Delft Dutch
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-sm font-bold text-gray-600 hover:text-[#FF9B00] transition-colors">
            Library
          </Link>
          <Link href="/review" className="text-sm font-bold text-gray-600 hover:text-[#FF9B00] transition-colors">
            Review Deck
          </Link>
          <Link href="/admin" className="text-xs font-bold text-[#FF9B00] hover:bg-orange-100 transition-colors bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100 uppercase tracking-wide">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
