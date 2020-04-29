import React from 'react'
import { NewMessageForm } from '../NewMessageForm'
import { Conversation, Message } from '../../utils/Types'
const orderedMessages = (messages: Message[]) => {
  const sortedMessages = messages.sort((a, b) => (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime() )

  return sortedMessages.map(message => { return <li key={message.id}>{message.text}</li> })
}

export const MessagesArea: React.FC<Conversation> = (conversation) => {
  let { id, title, messages } = conversation

  return (
    <div>
      <h2>{title}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm conversation_id={id} />
    </div>
  )
}
