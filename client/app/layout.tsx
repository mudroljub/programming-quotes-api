import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Programming Quotes",
  description: "Programming Quotes app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <header className="bg-blue-500 text-white p-4">
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        <footer className="bg-gray-800 text-white text-center p-4">
          <p>© {new Date().getFullYear()} Programming Quotes by mudroljub</p>
        </footer>
      </body>
    </html>
  );
}
