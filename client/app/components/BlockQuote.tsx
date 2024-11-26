import Link from 'next/link'
import { Quote } from '../../types';
import Stars from './Stars'

type Props = {
  quote: Quote
}

export default function BlockQuote({ quote } : Props): JSX.Element {
  const authorLink: string = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`;

  return (
    <blockquote className='bg-gray-900 text-white p-8'>
      <p className="text-xl">
        {quote.text}
      </p>
      <Stars rating={quote.rating ?? 0} />
      <span> — <Link href={authorLink} target='_blank' className="hover:underline">{quote.author}</Link></span>
    </blockquote>
  );
}
