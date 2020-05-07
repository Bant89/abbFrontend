import React from 'react'
import { RouteComponentProps } from '@reach/router'

type ConversationProps = RouteComponentProps & {
  cable: any;
  getConversationData: any
  updateConversation: any
}

export const RoomList = (props: ConversationProps) => {
  return <h3>RoomList</h3>
}