import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import actionCable from 'actioncable'
import { URL_WS, URL } from '../utils/Constants'
import { RoomList } from '../components/RoomList'
import { RoomSocket } from '../components/RoomSocket'


const Inbox = (props: RouteComponentProps) => {
  const cableApp = actionCable.createConsumer(URL_WS)
  const [conversation, setConversation] = useState({})
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const getConversationData = (title: string) => {
    fetch(`${URL}/conversations/${title}`)
    .then(response => response.json())
    .then(result => {
      console.log(result)
    })
  }

  const updateConversation = (newConversation: {}) => {
    console.log(newConversation)
  }

  return (
    <>
      <h1>Inbox</h1>
      <RoomList cable={cableApp} updateConversation={updateConversation} getConversationData={getConversationData} />
      {/* <RoomSocket cable={cableApp} updateConversation={updateConversation} getConversationData={getConversationData}/> */}
    </>
  )
}

export default Inbox
