import mongoose from 'mongoose'
import Quote from '../../models/Quote.js'
import QuoteService from '../../services/QuoteService.js'

function QuotePage({ quote, error }) {
  if (error)
    return <p>Error: {error}</p>

  if (!quote)
    return <p>Quote not found.</p>

  return (
    <div>
      <h1>Quote Details</h1>
      <p><strong>{quote.author}</strong>: "{quote.text}"</p>
      {quote.source && <p><em>Source: {quote.source}</em></p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  let quote = null
  let error = null

  try {
    // Povezivanje sa MongoDB i preuzimanje podataka
    if (!mongoose.connections[0].readyState)
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

    // quote = await Quote.findById(id).exec()
    quote = await QuoteService.getById(id)

    if (!quote)
      error = 'Quote not found'

  } catch (err) {
    error = 'Error fetching quote: ' + err.message
  }

  return {
    props: {
      quote: quote ? JSON.parse(JSON.stringify(quote)) : null,
      error,
    },
  }
}

export default QuotePage
