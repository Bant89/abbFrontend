import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { COUNTRIES } from '../../utils/Constants'
import { Link } from '@reach/router'

export const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .required('Required'),
      email: Yup.string().email('Not a valid email').required('Required'),
      password: Yup.string()
        .min(10, 'Password is too short, minimum 10 chars')
        .required('Required'),
      confirmPassword: Yup.string()
        .min(10, 'Password is too short, minimum 10 chars')
        .required('Required'),
      country: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('yo wats good ' + values)
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
        <label htmlFor="name">Name</label>
        <input id="name" placeholder="Name" {...formik.getFieldProps('name')} />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

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

        <label htmlFor="country">Country</label>
        <select
          placeholder="Country currently at:"
          {...formik.getFieldProps('country')}
        >
          {COUNTRIES.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {formik.touched.country && formik.errors.country ? (
          <div>{formik.errors.country}</div>
        ) : null}

        <button type="submit">Register</button>
      </form>
    <p>Already have an account?<br /><Link to="/login">login</Link></p>
    </div>
  )
}
