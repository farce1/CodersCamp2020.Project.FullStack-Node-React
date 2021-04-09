/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import person from '../../images/person.png'
import personAdd from '../../images/person_add.png'
import {
  Wrapper,
  Center,
  Grid,
  Button,
  Form,
  Input,
  Anchor,
  Div,
} from '../styled/styled'

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Błędny adres email').required('RWymagane'),
      password: Yup.string().required('Wymagane'),
    }),
    onSubmit: (values) => {
      // docelowo połączenie z serwerem i sprawdzenie usera
      console.log(values)
    },
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input>
        <label htmlFor="email" />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </Input>
      <Input>
        <label htmlFor="password" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Hasło"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </Input>
      <Button type="submit">Zaloguj się</Button>
    </Form>
  )
}

const Login = () => (
  <Div>
    <Wrapper>
      <Center>
        <img src={person} alt="" width="80" height="80" />
      </Center>
      <SignupForm />
      <Grid>
        <p>Nie masz konta?</p>
        <Center>
          <div>
            <a href="/">
              <Center>
                <img src={personAdd} alt="" width="24" height="24" />
              </Center>
            </a>
          </div>
          <Anchor href="/">Zarejestruj się</Anchor>
        </Center>
      </Grid>
    </Wrapper>
  </Div>
)

export default Login
