'use client'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  function isActive(link: string): string {
    return `hover:underline ${pathname === link ? 'font-bold' : ''}`
  }

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl">Programming Quotes</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className={isActive('/')}>Home</a>
            </li>
            <li>
              <a href="/stats" className={isActive('/stats')}>Stats</a>
            </li>
            <li>
              <a href="/about" className={isActive('/about')}>About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
