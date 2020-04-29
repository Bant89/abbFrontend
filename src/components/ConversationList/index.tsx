import React, { useState, useEffect } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import { NewConversationForm } from '../NewConversationForm'
import { MessagesArea } from '../MessagesArea'
import { Cable } from '../Cable'
import { URL } from '../../utils/Constants'
import { Conversation, Message } from '../../utils/Types'

const findActiveConversation = (conversations: Conversation[], activeConservation: string | null) => {
   let ans = conversations.find((conversation: Conversation) => conversation.id === activeConservation)
   if (ans) return ans
   else return { id: "", title: "", messages: []}
}

const mapConversations = (conversations: Conversation[], handleClick: { (id: any): void; (arg0: string): void }) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}> 
        {conversation.title}
      </li>
    )
  })
}

export const ConversationsList = () => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState('')

  useEffect(() => {
    fetch(`${URL}/conversations`)
    .then(res => res.json())
    .then(conversations => setConversations(conversations))
  },[])

  const handleClick = (id: string) => setActiveConversation(id)

  const handleReceivedConversation = (response: { conversation: any }) => {
    console.log(`Handle Received (Conversation) response: ${response}`)
    const { conversation } = response
    setConversations([...conversations, conversation ])
  }

  const handleReceivedMessage = (response: { message: any }) => {
    console.log(`Handle Received (Message) response: ${response}`)
    const { message } = response
    const convers = [...conversations]
    const conversation = convers.find(
      conversation => conversation.id === message.conversation_id
    )
    if(conversation)
      conversation.messages = [...conversation.messages, message]
    
    setConversations(convers)
    
  }

  return (
    <div>
      <ActionCable 
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={handleReceivedConversation}
      />
        { conversations.length ? 
          <Cable conversations={conversations} handleReceivedMessage={handleReceivedMessage} /> : null
        }
      <h2>Conversations</h2>
      <ul>{mapConversations(conversations, handleClick)}</ul>
      <NewConversationForm />
      {activeConversation ? <MessagesArea {...findActiveConversation(conversations, activeConversation)} /> : null}
    </div>
  )

}

