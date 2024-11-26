export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl">Programming Quotes</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/stats" className="hover:underline">Stats</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
        </ul>
      </nav>
    </div>
  </header>
  );
}
