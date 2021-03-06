import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Link } from '@reach/router'
import { COUNTRIES } from '../../utils/Constants'

export const RegistrationForm = () => {

  type User = {
    name: string,
    email: string,
    password: string,
    country: string,
    bio: string,
    languagues: string,
    isHost: boolean
  }


  const CreateUser = (values: User): void => {
    let { name, email, password, country, bio, languagues, isHost } = values
    axios.post('http://localhost:3000/auth/register', {
      params: {
        name,
        email,
        password,
        country,
        bio,
        languagues: [languagues.split(',')],
        is_host: isHost
      }
    }).then(response => {
      console.log(response)
    })
    .catch(error => console.error(error))
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      country: '',
      isHost: false,
      bio: '',
      languagues: '',
      photo: null
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .required('Required'),
      email: Yup.string().email('Not a valid email').required('Required'),
      password: Yup.string()
        .min(10, 'Password is too short, minimum 10 chars')
        .required('Required'),
      country: Yup.string().required('Required'),
      isHost: Yup.boolean().required('Required'),
      bio: Yup.string().required('Required'),
      languagues: Yup.string().required('Required'),
      photo: Yup.mixed()
    }),
    onSubmit: (values) => {
      const photo = values.photo
      delete values.photo
      console.log(`Photo: ${photo}`)
      debugger
      CreateUser(values)
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

        <label htmlFor="bio">Bio</label>
          <textarea id="bio" placeholder="bio" {...formik.getFieldProps('bio')} />
          {formik.touched.bio && formik.errors.bio ? (
            <div>{formik.errors.bio}</div>
          ) : null}

        <label htmlFor="isHost">Want to be a host?</label>
          <input id="isHost_true" placeholder="isHost" {...formik.getFieldProps('isHost')} type="radio" value="true"/> 
          <label htmlFor="isHost">Yes</label>
          <input id="isHost_false" placeholder="isHost" {...formik.getFieldProps('isHost')} type="radio" value="false"/>
          <label htmlFor="isHost">No</label>
          {formik.touched.isHost && formik.errors.isHost ? (
            <div>{formik.errors.isHost}</div>
          ) : null}

        <label htmlFor="languagues">Main languague:</label>
          <input id="languagues" placeholder="languagues" {...formik.getFieldProps('languagues')} />
          {formik.touched.languagues && formik.errors.languagues ? (
            <div>{formik.errors.languagues}</div>
          ) : null}

        <label htmlFor="photo">Photo:</label>
          <input id="photo" {...formik.getFieldProps('photo')} type="file"/>
          {formik.touched.photo && formik.errors.photo ? (
            <div>{formik.errors.photo}</div>
          ) : null}
        
        <button type="submit">Register</button>
      </form>
    <p>Already have an account?<br /><Link to="/login">login</Link></p>
    <p>Forgot password?<br /><Link to="/forgot">Reset</Link></p>
    </div>
  )
}
