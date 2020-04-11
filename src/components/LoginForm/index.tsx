import React from 'react'
import { useFormik } from 'formik'
import { Link } from '@reach/router'
import * as Yup from 'yup'

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Not a valid email').required('Required'),
      password: Yup.string()
        .min(10, 'Password is too short, minimum 10 chars')
        .required('Required'),
      confirmPassword: Yup.string()
        .min(10, 'Password is too short, minimum 10 chars')
        .required('Required')
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
      }, 1000)
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

      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        id="confirmPassword"
        placeholder="Confirm password"
        type="password"
        {...formik.getFieldProps('confirmPassword')}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}
      <button type="submit">Log In</button>
    </form>
    <p>Don't have an account?<br /><Link to="/register">register</Link></p>
    </div>
  )
}