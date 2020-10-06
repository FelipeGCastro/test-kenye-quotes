import React, { useState, useCallback } from 'react'
import './app.css'
import api from './services/api'

import Quote from './components/Quotes'

function App() {
  const [quotes, setQuotes] = useState([])

  const handleAddQuote = async () => {
    try {
      const result = await api.get('/')
      if (result) {
        const newQuotes = quotes.concat([result.data.quote])
        setQuotes(newQuotes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteQuote = useCallback((quoteIndex) => {
    const newQuotes = quotes.filter((item, index) => index !== quoteIndex)
    setQuotes(newQuotes)
  }, [quotes, setQuotes])

  const renderQuote = useCallback((quote, index) => {
    return <Quote key={index} quote={quote} onDelete={handleDeleteQuote.bind(null, index)} />
  }, [handleDeleteQuote])

  const renderQuotes = useCallback(() => {
    return (
      <ul>
        {quotes.map(renderQuote)}
      </ul>)
  }, [quotes, renderQuote])

  return (
    <div className='container'>
      {renderQuotes()}
      <button onClick={handleAddQuote} className='quoteButton'>Request Quote</button>
    </div>
  )
}

export default App