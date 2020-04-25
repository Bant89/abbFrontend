import React from 'react';
import { User } from '../utils/Types'

const UserContext = React.createContext<User | undefined>(undefined)

type UserProviderProps = {children: React.ReactNode}

function useUser() {
  const context = React.useContext(UserContext);

  if (!context) throw new Error(`useUser must be used within a UserProvider`)

  return context;
}

function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = React.useState<User>()
  const value = React.useMemo(() => [user, setUser], [user])
  return (
    <UserContext.Provider value={value} >
      {children}
    </UserContext.Provider>
  )
}

export {UserProvider, useUser}