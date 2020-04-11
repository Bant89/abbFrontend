import React, { useEffect } from 'react'
import { RouteComponentProps, useLocation } from '@reach/router'
import { RegistrationForm } from '../components/RegistrationForm'
import { LoginForm } from '../components/LoginForm'

const Register = (props: RouteComponentProps) => {
  const location = useLocation()

  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location])
  return (
    <div>
      { location.pathname === '/register' ?
        <RegistrationForm /> :
        <LoginForm/>}
    </div>
  )
}

export default Register
