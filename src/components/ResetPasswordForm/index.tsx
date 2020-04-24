import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { RouteComponentProps, Link } from '@reach/router'

const ResetPasswordForm = (props: RouteComponentProps) => {
  const [sentToken, setSentToken] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const SendToken = (email: string): void => {
    setUserEmail(email)
    axios.post('http://localhost:3000/auth/password/forgot', {
      params: {
        email
      }
    }).then(response => {
      console.log(response)
      setSentToken(true)
    })
    .catch(error => console.error(error))
  }

  const ResetPassword = (email: string, password: string, token: string): void => {
    axios.post('http://localhost:3000/auth/password/reset', {
      params: {
        email,
        password,
        token
      }
    }).then(response => {
      console.log(response)
    })
    .catch(error => console.error(error))
  }


  const tokenFormik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Not a valid email').required('Required'),
    }),
    onSubmit: (values) => {
      SendToken(values.email)
      setTimeout(() => {
        alert(JSON.stringify(values.email, null, 2))
      }, 1000)
    },
  })


  const resetFormik = useFormik({
    initialValues: {
      token: '',
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
      token: Yup.string()
      .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(`Llego aqui ${values}`);
      ResetPassword(userEmail, values.password, values.token)
      setTimeout(() => {
        alert(JSON.stringify(userEmail, null, 2))
      }, 1000)
    },
  })


  return (
    <div>
      <form
        onSubmit={tokenFormik.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Email"
          {...tokenFormik.getFieldProps('email')}
        />
        {tokenFormik.touched.email && tokenFormik.errors.email ? (
          <div>{tokenFormik.errors.email}</div>
        ) : null}
        <button type="submit">Send Token</button>
      </form>
      {sentToken &&  
      <form
        onSubmit={resetFormik.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="token">Token</label>
        <input
          id="token"
          placeholder="token"
          {...resetFormik.getFieldProps('token')}
        />
        {resetFormik.touched.token && resetFormik.errors.token ? (
          <div>{resetFormik.errors.token}</div>
        ) : null}
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          placeholder="password"
          type="password"
          {...resetFormik.getFieldProps('password')}
        />
        {resetFormik.touched.password && resetFormik.errors.password ? (
          <div>{resetFormik.errors.password}</div>
        ) : null}
        <button type="submit">Reset Password</button>
      </form>}
      <p>
        Don't have an account?
        <br />
        <Link to="/register">register</Link>
      </p>
    </div>
  )
}

export default ResetPasswordForm;