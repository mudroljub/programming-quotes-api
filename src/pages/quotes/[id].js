import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function QuotePage() {
  const router = useRouter()
  const { id } = router.query
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/quotes/${id}`)
      .then(res => res.json())
      .then(data => {
        setQuote(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!quote) return <p>Quote not found.</p>

  return (
    <div>
      <h1>Quote Details</h1>
      <p><strong>{quote.author}</strong>: "{quote.text}"</p>
      {quote.source && <p><em>Source: {quote.source}</em></p>}
    </div>
  )
}

export default QuotePage
