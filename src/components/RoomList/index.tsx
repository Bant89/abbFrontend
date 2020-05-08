import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserState } from '../../utils/ReduxTypes'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { URL } from '../../utils/Constants'
import { User } from '../../utils/Types'

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

const getActiveConversations = ((user: User)  => {
  let userExtract = extractFragment(user.id);
  fetch(`${URL}/conversations`)
  .then(response => response.json())
  .then(conversations => {
    let res = conversations.filter((conver: { title: string | string[] }): any => {
      return conver.title.includes(userExtract)
    })
    console.log('Active conversations ', JSON.stringify(res))
  })
  .then(result => {
    console.log(result)
  })
})

const createConversation = ((user: User, host: User) => {
  let title = `${extractFragment(host.id)}${extractFragment(user.id)}`;
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
  const { loading, error, data } = useQuery(GET_USERS)
  const selectLoginState = (state: RootState) => state.userState
  const  { user } = useSelector(selectLoginState)
  useEffect(() => {
    console.log(props)
  })
  if (loading) return <h3>Loading hosts</h3>
  if (error) return <h3>Something went wrong {error}</h3>
  const results = data.users.filter((user: User) => user.isHost)
  console.log(results)
  console.log('User ', JSON.stringify(user))

  return (
    <>
      <h3>RoomList</h3>
      <ul>
        {results.map((host: User) => {
          return (
          <li key={host.id}>Name: {host.name} ID: {host.id} 
          <button onClick={() => createConversation(user, host)}>Start Conversation</button>
          </li>
          )  
        })}  
      </ul>  
      <h3>Active Conversations from user:</h3>
        <button onClick={() => getActiveConversations(user)}>Get Data</button>
        <button onClick={() => {
          props.cable.subscriptions.create({
            channel: 'ConversationsChannel',
            conversation: '90baa1f6cf01e38c'
          })
        }}>Start connection</button>
    </>
  )
}