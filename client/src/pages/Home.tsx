import React, { Fragment } from 'react';
import Counter from '../components/counter/Counter';
import Socials from "../components/socials";

export const Home: React.FC = () => {
  return (
    <Fragment>
      <h1>Redux + TypeScript</h1>
      <Socials />
      <Counter />
    </Fragment>
  );
};
