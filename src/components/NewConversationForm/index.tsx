import React, { useState } from 'react'
import { URL_WS, HEADERS } from '../../utils/Constants'

export const NewConversationForm = () => {
  const [title, setTitle] = useState('')

  const handleChange = e => setTitle(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`${URL_WS}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({title})
    })
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>New conversation:</label>  
        <input type="text" value={title} onChange={handleChange} />
      </form>
    </div>
  )
}