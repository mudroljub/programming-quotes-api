import { ReactNode } from 'react';
import type { Metadata } from "next";
import Header from './components/Header'
import "./globals.css";

export const metadata: Metadata = {
  title: "Programming Quotes",
  description: "Programming Quotes app",
};

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex flex-col min-h-screen">
        <Header/>

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