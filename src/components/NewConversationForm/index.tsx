import React, { useState } from 'react'
import { URL, HEADERS } from '../../utils/Constants'

export const NewConversationForm = () => {
  const [title, setTitle] = useState('')

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    fetch(`${URL}/conversations`, {
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
        <input type="submit" value="Submit Conversation"/>
      </form>
    </div>
  )
}