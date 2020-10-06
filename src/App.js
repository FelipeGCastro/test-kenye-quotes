import React, { useState, useCallback } from 'react'
import './app.css'
import api from './services/api'

import Quote from './components/Quotes'

function App() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAddQuote = async () => {
    setLoading(true)
    try {
      const result = await api.get('/')
      if (result) {
        const newQuotes = quotes.concat([result.data.quote])
        setQuotes(newQuotes)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleDeleteQuote = useCallback((quoteIndex) => {
    const newQuotes = quotes.filter((item, index) => index !== quoteIndex)
    setQuotes(newQuotes)
  }, [quotes, setQuotes])

  const handleDeleteAll = useCallback(() => {
    setQuotes([])
  }, [])

  const renderQuote = useCallback((quote, index) => {
    return <Quote key={index} quote={quote} onDelete={handleDeleteQuote.bind(null, index)} />
  }, [handleDeleteQuote])

  const renderQuotes = useCallback(() => {
    return (
      <ul className='quotesContainer'>
        {quotes.map(renderQuote)}
      </ul>)
  }, [quotes, renderQuote])

  return (
    <div className='container'>
      <header className='buttonsContainer'>
        <button
          onClick={handleAddQuote}
          className='quoteButton'>{loading ? 'Loading' : 'Request Quote'}</button>
        <button onClick={handleDeleteAll} className='quoteButton deleteAllButton'>Delete All</button>
      </header>
      {renderQuotes()}
    </div>
  )
}

export default App
