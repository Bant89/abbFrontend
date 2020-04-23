import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link } from '@reach/router'
import * as Yup from 'yup'

export const LoginForm = () => {

  interface Credentials {
    email: string,
    password: string
  }

  const GetToken = (values : Credentials) => {
    axios.post('http://localhost:3000/auth/login', {
      params: {
        email: values.email,
        password: values.password
      }
    }).then(response => {
      console.log(response);
      let { access_token, user_id } = response.data;

      if (sessionStorage.getItem('access_token') === null )
        sessionStorage.setItem('access_token', access_token)
      
      if (sessionStorage.getItem('user_id') === null) 
        sessionStorage.setItem('user_id', user_id)
      
    })
    .catch(error => {
      console.log(error);
    })
  } 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Not a valid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      GetToken(values)
    },
  })
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account?
        <br />
        <Link to="/register">register</Link>
      </p>
    </div>
  )
}
