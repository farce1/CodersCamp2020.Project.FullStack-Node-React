/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import person from '../../images/person.png'
import registerPerson from '../../images/register.png'
import {
  Wrapper,
  Center,
  Flex,
  Button,
  Form,
  Input,
  Anchor,
  Div,
  Checkbox,
  CheckboxWrapper,
  Paragraph,
  Sukcces,
} from '../styled/styled'

const RegisterForm = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [sendingMail, setSendingMail] = useState('')
  const mailMsg =
    'W celu dokończenia rejestracji należy zalogować się na swoją skrzynkę pocztową i w otrzymanej z systemu wiadomości kliknąć w link aktywacyjny. W celu przejścia do panelu logowania należy kliknąć opcję Zaloguj się.'
  async function sending(values: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
  }) {
    await fetch('http://localhost:8080/auth/register', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 400) {
          setErrorMsg(res.message)
        } else {
          setSendingMail(mailMsg)
        }
      })
  }
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, 'Imię musi mieć minimum 3 litery')
        .max(20, 'Imię musi mieć mniej niż 20 liter')
        .required('Imię jest wymagane')
        .matches(/^[a-zA-Z0-9]+$/, 'Imię nie może zawierać specjalnych znaków'),
      lastName: Yup.string()
        .min(2, 'Naziwsko mieć minimum 2 litery')
        .max(20, 'Nazwisko musi mieć mniej niż 20 liter')
        .required('Nazwisko jest wymagane'),
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
      sending(values)
      formik.resetForm()
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      {errorMsg ? <Paragraph>{errorMsg}</Paragraph> : null}
      {sendingMail ? <Sukcces>{sendingMail}</Sukcces> : null}
      <Input>
        <label htmlFor="firstName" />
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Imię"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
      </Input>
      <Input>
        <label htmlFor="lastName" />
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Nazwisko"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
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
      <Flex>
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
      </Flex>
    </Wrapper>
  </Div>
)

export default Register
