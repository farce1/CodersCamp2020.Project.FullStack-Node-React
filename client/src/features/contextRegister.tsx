/* eslint-disable react/destructuring-assignment */
import React, { createContext, useState } from 'react';

export const FormContext = createContext([]);

export const FormProvider = (props: any) => {
  const [formData, setformData] = useState([]);

  return <FormContext.Provider value={[formData, setformData]}>{props.children}</FormContext.Provider>;
};
