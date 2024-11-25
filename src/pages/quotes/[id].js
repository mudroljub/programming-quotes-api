import Link from 'next/link'

export async function getServerSideProps() {
  const res = await fetch('http://localhost:5000/api/quotes/5a9b21892bad9600044b7006')
  const quote = await res.json()
  return { props: { quote } }
}

export default function Page({ quote }) {
  const authorLink = `https://en.wikipedia.org/wiki/${quote.author.replace(/ /g, '_')}`
  return (
    <blockquote>
      <p className="quote-text">
        {quote.text}
      </p>
      {/* <Stars rating={quote.rating} id={id} /> */}
      <span> — <Link href={authorLink} target='_blank'>{quote.author}</Link></span>
    </blockquote>
  )
}