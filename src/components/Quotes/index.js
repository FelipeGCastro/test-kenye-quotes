import React from 'react'

import './styles.css'

function Quotes ({ quote, onDelete }) {
  return (
    <li className='quoteContainer'>
      <p>"{quote}"</p>
      <button className='quoteDeleteButton' onClick={onDelete}>Delete</button>
    </li>
  )
}

export default Quotes
