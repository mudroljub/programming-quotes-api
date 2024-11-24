import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function QuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [author, setAuthor] = useState('')
  const [page, setPage] = useState(1)
  const [quotesPerPage, setQuotesPerPage] = useState(20)

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({
      page,
      quotesPerPage,
      author,
    })

    fetch(`/api/quotes?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setQuotes(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [page, author, quotesPerPage])

  const handleAuthorChange = e => {
    setAuthor(e.target.value)
    setPage(1) // Reset to page 1 on author change
  }

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Programming Quotes</h1>
      <input
        type="text"
        value={author}
        onChange={handleAuthorChange}
        placeholder="Filter by author"
      />
      <ul>
        {quotes.map(quote => (
          <li key={quote.id}>
            <strong>{quote.author}</strong>: "{quote.text}"
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
          Prev
        </button>
        <span> Page {page} </span>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  )
}

export default QuotesPage
