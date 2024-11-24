import { useState } from 'react'

function AddQuotePage() {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Example of using token
      },
      body: JSON.stringify({ author, text, source }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      setError(errorData.message)
      return
    }

    // handle success, maybe redirect to a list page or clear form
  }

  return (
    <div>
      <h1>Add New Quote</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Quote Text"
        />
        <input
          type="text"
          value={source}
          onChange={e => setSource(e.target.value)}
          placeholder="Source"
        />
        <button type="submit">Add Quote</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default AddQuotePage
