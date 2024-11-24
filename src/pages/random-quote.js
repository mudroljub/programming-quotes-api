import { useEffect, useState } from 'react'

function RandomQuotePage() {
  const [quote, setQuote] = useState(null)

  useEffect(() => {
    fetch('/api/quotes/random')
      .then(res => res.json())
      .then(data => setQuote(data))
      .catch(error => console.error('Error fetching random quote:', error))
  }, [])

  if (!quote) return <p>Loading...</p>

  return (
    <div>
      <h1>Random Programming Quote</h1>
      <p><strong>{quote.author}</strong>: "{quote.text}"</p>
    </div>
  )
}

export default RandomQuotePage
