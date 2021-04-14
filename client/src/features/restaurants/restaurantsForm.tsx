/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Wrapper, Button, Form, Input, Div } from '../../components/styled/styled';
import { FormProvider, FormContext } from '../contextRegister';

const AddressForm = () => {
  const [formData, setformData] = useContext(FormContext);

  const formik = useFormik({
    initialValues: {
      street: '',
      city: '',
      country: '',
    },

    validationSchema: Yup.object({
      street: Yup.string()
        .min(3, 'Ulica musi mieć minimum 3 znaki oraz podany nr budynku')
        .max(30, 'Nazwa ulicy musi mieć mniej niż 30 liter')
        .required('Wymagane'),
      city: Yup.string()
        .min(3, 'Miasto musi mieć minimum 3 znaki oraz kod pocztowy')
        .max(30, 'Miasto musi mieć mniej niż 30 liter')
        .required('Wymagane'),
      country: Yup.string()
        .min(3, 'Kraj musi mieć minimum 3 znaki')
        .max(30, 'Kraj musi mieć mniej niż 30 liter')
        .required('Wymagane'),
    }),

    onSubmit: values => {
      setformData(...formData, { values });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input>
        <label htmlFor="street" />
        <input
          id="street"
          name="street"
          type="text"
          placeholder="Nazwa ulicy i nr budynku"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
        />
        {formik.touched.street && formik.errors.street ? <div>{formik.errors.street}</div> : null}
      </Input>
      <Input>
        <label htmlFor="city" />
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Miasto"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city ? <div>{formik.errors.city}</div> : null}
      </Input>
      <Input>
        <label htmlFor="country" />
        <input
          id="country"
          name="country"
          type="text"
          placeholder="Kraj"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
        />
        {formik.touched.country && formik.errors.country ? <div>{formik.errors.country}</div> : null}
      </Input>
    </Form>
  );
};

const RestaurantForm = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setformData] = useContext(FormContext);
  async function sending(values: {
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
    description: string;
    siteUrl: string;
  }) {
    console.log(values);
    await fetch('http://localhost:8080/restaurants', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 400) {
          setErrorMsg(res.message);
          console.log(res);
        } else {
          console.log(res);
        }
      });
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      description: '',
      siteUrl: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Nazwa musi mieć minimum 2 litery')
        .max(30, 'Nazwa musi mieć mniej niż 30 liter')
        .required('Nazwa jest wymagana'),
      email: Yup.string().email('Błędny adres email').required('Wymagane'),
      description: Yup.string().max(1000, 'Opis musi mieć mniej niż 1000 liter'),
      siteUrl: Yup.string(),
    }),
    onSubmit: values => {
      setformData(...formData, { values });
      sending(formData);
      formik.resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {errorMsg ? <p>{errorMsg}</p> : null}
      <Input>
        <label htmlFor="name" />
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nazwa restauracji"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
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
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </Input>
      <AddressForm />
      <Input>
        <label htmlFor="description" />
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Opis restauracji"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
      </Input>
      <Input>
        <label htmlFor="siteUrl" />
        <input
          id="siteUrl"
          name="siteUrl"
          type="text"
          placeholder="Link do strony restauracji"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.siteUrl}
        />
        {formik.touched.siteUrl && formik.errors.siteUrl ? <div>{formik.errors.siteUrl}</div> : null}
      </Input>
      <Button type="submit">Dodaj restaurację</Button>
    </Form>
  );
};

const RegisterRestaurant = () => {
  return (
    <FormProvider>
      <Div>
        <Wrapper>
          <RestaurantForm />
        </Wrapper>
      </Div>
    </FormProvider>
  );
};

export default RegisterRestaurant;
