import Link from 'next/link'
import { Quote } from '../types/quote';
import Stars from './components/Stars'
import BlockQuote from './components/BlockQuote'

export default async function Home(): Promise<JSX.Element> {
  const res = await fetch('http://localhost:5000/api/quotes/random');
  const quote: Quote = await res.json();

  const authorLink: string = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`;

  return (
    <>
      <BlockQuote quote={quote} />

      <form method="GET" className="mt-4">
        <button type="submit" className="h-10 px-6 font-semibold bg-black text-white">
          New quote
        </button>
      </form>
    </>
  );
}
