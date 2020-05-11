import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserState } from '../../utils/ReduxTypes'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { URL } from '../../utils/Constants'
import { User, Conversation, Message } from '../../utils/Types'

type ConversationProps = RouteComponentProps & {
  cable: any;
  getConversationData: any
  updateConversation: any
}

interface RootState {
  userState: UserState
}

const GET_USERS = gql`
  {
    users {
      id
      name
      isHost
    }
  }
`
const extractFragment = (id: string) => id.substring(0, id.indexOf('-'));

const getActiveConversations = async (user: User): Promise<Conversation[]|null> => {
  let userExtract = extractFragment(user.id);
  let response = await fetch(`${URL}/conversations`)
  let data = await response.json()
  let res = data.filter((conver: { title: string | string[] }): any => {
    return conver.title.includes(userExtract)
  })
  console.log('Active conversations ', JSON.stringify(res))
  return res
}

const createConversation = ((user: User, host: User, setConversationTitle: any) => {
  let title = `${extractFragment(host.id)}${extractFragment(user.id)}`;
  setConversationTitle(title)
  axios.post(`${URL}/conversations`, {
      conversation: {
        title
      }
  }).then(response => {
    console.log(response)
  })
  .catch(error => console.error(error))
})

export const RoomList = (props: ConversationProps) => {
  const [message, setMessage] = useState('')
  const [conversationTitle, setConversationTitle] = useState('')
  const [activeConversation, setActiveConversation] = useState<Conversation[]|null>(null)
  const { loading, error, data } = useQuery(GET_USERS)
  const selectLoginState = (state: RootState) => state.userState
  const  { user } = useSelector(selectLoginState)
  // useEffect(() => {
  //   console.log(props)
  // })
  if (loading) return <h3>Loading hosts</h3>
  if (error) return <h3>Something went wrong {JSON.stringify(error)}</h3>
  const results = data.users.filter((user: User) => user.isHost)
  let chat, header;
  if(activeConversation) {
    header = <h3>{activeConversation[0].title}</h3>;
    chat = activeConversation[0].messages.map((msg: Message) => <div><h3>{msg.text}</h3></div>)
  }else {
    header = <h3>No active conversation at the moment</h3>;
  } 
  
  return (
    <>
      <h3>RoomList</h3>
      <ul>
        {results.map((host: User) => {
          return (
          <li key={host.id}>Name: {host.name} ID: {host.id} 
          <button onClick={() => createConversation(user, host, setConversationTitle)}>Start Conversation</button>
          </li>
          )  
        })}  
      </ul>  
      <h3>Active Conversations from user:</h3>
        <button onClick={async () => {
          let activeConver = await getActiveConversations(user).then(res => res)
          setActiveConversation(activeConver)
          debugger
        }
        }>Get Data</button>
        <button onClick={() => {
          props.cable.conversation = props.cable.subscriptions.create({
            channel: 'ConversationsChannel',
            conversation: '62aef675cf01e38c'
          },
          {
            received: (newData: any) => {
              debugger
              console.log('NEW DATA')
              console.log(newData)
            }
          })
        }}>Start connection</button>
        <div>
          {header}
          {chat}
        </div>
      <form onSubmit={(event) => {
        event.preventDefault()
        const params = {
          text: message,
          conversation_title: '62aef675cf01e38c'
        }
        axios.post(`${URL}/messages`, {
         params
      }).then(response => {
        console.log(response)
      })
      .catch(error => console.error(error))
      }}>
        <h3>Post a new message:</h3>
        <textarea value={message} onChange={(event) => {
          setMessage(event.target.value)
        }}></textarea>
        <br/>
        <input type="submit"/>
      </form>
    </>
  )
}