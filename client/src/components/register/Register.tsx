/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import person from '../../images/person.png'
import registerPerson from '../../images/register.png'
import {
  Wrapper,
  Center,
  Grid,
  Button,
  Form,
  Input,
  Anchor,
  Div,
  Checkbox,
  CheckboxWrapper,
} from '../styled/styled'

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      checked: [],
    },

    validationSchema: Yup.object({
      login: Yup.string()
        .max(15, 'Może mieć maximum 15 znaków')
        .min(3, 'Musi mieć minimum 3 znaki')
        .required('Wymagane'),
      email: Yup.string().email('Błędny adres email').required('Wymagane'),
      password: Yup.string()
        .min(6, 'Hasło musi mieć minimum 6 znaków')
        .required('Wymagane'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same')
        .required('Potwierdzenie hasła jest wymagane'),
      acceptTerms: Yup.boolean()
        .required('Potwierdzenie regulaminu jest wymagane')
        .oneOf([true], 'Zaakceptowanie regulaminu jest wymagane'),
    }),
    onSubmit: (values) => {
      // dodać przekierowanie
      console.log(values)
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input>
        <label htmlFor="login" />
        <input
          id="login"
          name="login"
          type="text"
          placeholder="Login"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
        />
        {formik.touched.login && formik.errors.login ? (
          <div>{formik.errors.login}</div>
        ) : null}
      </Input>
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
      <Input>
        <label htmlFor="confirmPassword" />
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Powtórz hasło"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </Input>
      <CheckboxWrapper>
        <label htmlFor="acceptTerms">Akceptuję regulamin</label>
        <Checkbox
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          // value={formik.values.acceptTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
          <div>{formik.errors.acceptTerms}</div>
        ) : null}
      </CheckboxWrapper>
      <Button type="submit">Zarejestruj się</Button>
    </Form>
  )
}

const Register = () => (
  <Div>
    <Wrapper>
      <Center>
        <img src={registerPerson} alt="" width="60" height="60" />
      </Center>
      <RegisterForm />
      <Grid>
        <p>Masz już konto?</p>
        <Center>
          <div>
            <a href="/login">
              <Center>
                <img src={person} alt="" width="24" height="24" />
              </Center>
            </a>
          </div>
          <Anchor href="/login">Zaloguj się</Anchor>
        </Center>
      </Grid>
    </Wrapper>
  </Div>
)

export default Register
