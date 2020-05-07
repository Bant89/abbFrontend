import React, { useEffect } from 'react'
import { RouteComponentProps, useParams } from '@reach/router'

type ConversationProps = RouteComponentProps & {
  cable: any;
  getConversationData: any,
  updateConversation: any
}

export const RoomSocket = (props: ConversationProps) => {
  const { getConversationData, cable, updateConversation } = props
  const params = useParams()
  const conversationTitle = params.conversationTitle
  useEffect(() => {
    if(conversationTitle !== undefined)
      getConversationData(conversationTitle)

    // cable.conversation = cable.cable.subscriptions.create(
    //   {
    //     channel: 'ConversationsChannel',
    //     conversation: conversationTitle
    //   },
    //   {
    //     received: (updatedConversation: any) => {
    //       updateConversation(updatedConversation)
    //     }
    //   }
    //   )

  }, [ conversationTitle, getConversationData])

  return <h5>RoomSocket</h5>
}