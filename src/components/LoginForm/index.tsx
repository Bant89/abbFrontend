import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link, useNavigate } from '@reach/router'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { login_request, failed_login, login_success } from '../../actions/index'

import { UserCredentials } from '../../utils/Types'

export const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const GetToken = (values: UserCredentials) => {
    dispatch(login_request(values))
    axios
      .post('http://localhost:3000/auth/login', {
        params: {
          email: values.email,
          password: values.password,
        },
      })
      .then((response) => {
        console.log(response)
        let { access_token, user_id } = response.data
        sessionStorage.setItem('access_token', access_token)
        sessionStorage.setItem('user_id', user_id)
        dispatch(login_success({user_id, access_token}))
      })
      .catch((error) => {
        console.log(error)
        dispatch(failed_login(error))
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
      console.log(values)
      GetToken(values)
      navigate('/main')
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

      <p>
        Forgot password?
        <br />
        <Link to="/forgot">Reset</Link>
      </p>
    </div>
  )
}
