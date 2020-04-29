import React from 'react'
import { Conversation } from '../../utils/Types'
import { ActionCable } from 'react-actioncable-provider'

export const Cable = ({ conversations, handleReceivedMessage }: any) => {
  return (
    <>
    {conversations.map((conversation: Conversation) => {
      return (
        <ActionCable
        key={conversation.id}
        channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
        onReceived={handleReceivedMessage}
        />
      )
    })}
    </>
  )
}
