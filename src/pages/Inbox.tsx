import React from 'react'
import { ActionCableProvider } from 'react-actioncable-provider'
import { RouteComponentProps } from '@reach/router'
import { URL_WS } from '../utils/Constants'
import { ConversationsList } from '../components/ConversationList'


const Inbox = (props: RouteComponentProps)  => {
  return (
    <ActionCableProvider url={URL_WS}>
     <h1>Inbox</h1>
     <ConversationsList />
    </ActionCableProvider>
  )
}

export default Inbox