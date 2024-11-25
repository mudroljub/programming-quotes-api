import Link from 'next/link'
import { Quote } from '../types/quote';

export default async function Home(): Promise<JSX.Element> {
  const res = await fetch('http://localhost:5000/api/quotes/5a9b21892bad9600044b7006');
  const quote: Quote = await res.json();

  const authorLink: string = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`;

  return (
    <blockquote>
      <p className="quote-text">
        {quote.text}
      </p>
      <span> — <Link href={authorLink} target='_blank' className="hover:underline">{quote.author}</Link></span>
    </blockquote>
  );
}
