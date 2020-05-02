import React, { useState } from 'react'
import { Message } from '../../utils/Types'
import { URL, HEADERS } from '../../utils/Constants'

export const NewMessageForm = ( { conversation_id }: { conversation_id: string } ) => {
  const [text, setText] = useState('')
  const [conversationId] = useState(conversation_id)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setText(e.currentTarget.value)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(`Text ${text}, conversation ID: ${conversationId}`)
    fetch(`${URL}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ text, conversation_id: conversationId })
    })
    setText('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>New Message:</label> <br />
        <input type="text" value={text} onChange={handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )

}
