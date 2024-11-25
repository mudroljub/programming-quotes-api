import Link from 'next/link'
import { Quote } from '../types/quote';
import Stars from './components/Stars'

export default async function Home(): Promise<JSX.Element> {
  const res = await fetch('http://localhost:5000/api/quotes/random');
  const quote: Quote = await res.json();

  const authorLink: string = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`;

  return (
    <>
      <blockquote className='bg-gray-900 text-white p-8'>
        <p className="text-xl">
          {quote.text}
        </p>
        <Stars rating={quote.rating ?? 0} />
        <span> — <Link href={authorLink} target='_blank' className="hover:underline">{quote.author}</Link></span>
      </blockquote>

      <form method="GET" className="mt-4">
        <button type="submit" className="h-10 px-6 font-semibold rounded-md bg-black text-white">
          New quote
        </button>
      </form>
    </>
  );
}
