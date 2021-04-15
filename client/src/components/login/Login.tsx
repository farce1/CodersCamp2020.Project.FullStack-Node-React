/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { useCookies } from 'react-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import person from '../../images/person.png';
import personAdd from '../../images/person_add.png';
import { Wrapper, Center, Flex, Button, Form, Input, Anchor, Paragraph, Div } from '../styled/styled';

const SignupForm = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  async function sending(values: { email: string; password: string; errorSubmit: boolean }) {
    await fetch('http://localhost:8080/auth/login', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 401) {
          setErrorMsg('Błędny login lub hasło');
        } else {
          setCookie('token', res.token, { path: '/' });
          console.log(cookies);
          window.location.assign('/');
        }
      });
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      errorSubmit: false,
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Błędny adres email').required('Wymagane'),
      password: Yup.string().required('Wymagane'),
      errorSubmit: Yup.string().required('Błędny login lub hasło'),
    }),
    onSubmit: values => {
      sending(values);
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      {errorMsg ? <Paragraph>{errorMsg}</Paragraph> : null}
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
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </Input>
      <Button type="submit">Zaloguj się</Button>
    </Form>
  );
};

const Login = () => (
  <Div>
    <Wrapper>
      <Center>
        <img src={person} alt="" width="80" height="80" id="login" />
      </Center>
      <SignupForm />
      <Flex>
        <p>Nie masz konta?</p>
        <Center>
          <div>
            <a href="/register">
              <Center>
                <img src={personAdd} alt="" width="24" height="24" />
              </Center>
            </a>
          </div>
          <Anchor href="/register">Zarejestruj się</Anchor>
        </Center>
      </Flex>
    </Wrapper>
  </Div>
);

export default Login;
