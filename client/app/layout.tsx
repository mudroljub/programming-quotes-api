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
      <body className="bg-gray-100 flex flex-col min-h-screen">

        <header className="bg-blue-500 text-white p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl">Programming Quotes</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl flex-grow container mx-auto pt-4">
          {children}
        </main>

        <footer className="bg-gray-800 text-white text-center p-4">
          <p>🄯 Programming Quotes by mudroljub and open source community</p>
        </footer>

      </body>
    </html>
  );
}
