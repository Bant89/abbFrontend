import React from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Select, Button, Box } from "@chakra-ui/core"
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';

export const RegistrationForm = () => {
  return (
    <Box shadow="md" borderWidth="1px" p={3}>
    <Formik 
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}  
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
      }, 1000)}}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(60, 'Must be 60 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Not a valid email')
          .required('Required'),
        password: Yup.string()
          .min(10, 'Password is too short, minimum 10 chars')
          .required('Required'),
        confirmPassword: Yup.string()
          .min(10, 'Password is too short, minimum 10 chars')
          .required('Required')
      })}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <Field name="name">
          {({field, form}) => (
            <FormControl isInvalid={form.errors.name && form.touched.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input {...field} id="name" placeholder="name" />
              <FormHelperText id="name-helper-text">The name that other users we'll see.</FormHelperText>
              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          )}
          </Field>
          <Field name="email">
          {({field, form}) => (
            <FormControl isInvalid={form.errors.email && form.touched.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input {...field} id="email" placeholder="email" />
              <FormErrorMessage>{form.errors.email}</FormErrorMessage>
            </FormControl>
          )}
          </Field>
          <Field name="password">
          {({field, form}) => (
            <FormControl isInvalid={form.errors.password && form.touched.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input {...field} id="password" placeholder="password" />
              <FormErrorMessage>{form.errors.password}</FormErrorMessage>
            </FormControl>
          )}
          </Field>
          <Field name="confirmPassword">
          {({field, form}) => (
            <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <Input {...field} id="confirmPassword" placeholder="Confirm password" />
              <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
            </FormControl>
          )}
          </Field>
          <Button mt={4} variantColor="teal" isLoading={props.isSubmitting} type="submit">
            Register
          </Button>
        </Form>
      )}
    </Formik>
    </Box>
  )
}
