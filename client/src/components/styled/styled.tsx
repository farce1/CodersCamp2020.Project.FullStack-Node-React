// import React from 'react';

import styled from 'styled-components';

export const Input = styled.section`
  padding-left: 1em;
  padding-right: 1em;
  background: FFFFFF;
  width: 50%;
  box-sizing: border-box;
  box-shadow: 0 0 5px 5px #D7D7D7;
  margin-top: 1.5em;
  font-size: 0.5em;
  color: red;
  @media (max-width: 750px) {
    width: 90%;
  }
`;

export const Grid = styled.section`
  padding-left: 1em;
  padding-right: 1em;
  background: FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const Center = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0.3em;
  justify-self: center;
  @media (max-width: 750px) {
    justify-content: center;
  }
`;

export const Anchor = styled.a`
  text-decoration: none;
  color: #555555;
`;

export const Button = styled.button`
  display: inline-block;
  color: #B79C10;
  background: #FFE145;
  font-size: 1em;
  border-radius: 10px;
  border: #FFE145;
  display: block;
  padding: 1em;
  justify-items: center;
  margin: 1em;
  box-sizing: border-box;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export const Form = styled.form`
  text-align: center;
  display: grid;
  width: 100%;
  justify-items: center;
  justify-self: center;
  box-sizing: border-box;
`;

export const Wrapper = styled.section`
  display: grid;
  width: 70%;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: stretch;
  justify-self: center;
  background: FFFFFF;
  font-size: 1.5em;
  text-align: center;
  color: #555555;
  box-shadow: 0 0 5px 5px #D7D7D7;
  box-sizing: border-box;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export const Div = styled.section`
  width: 100%;
  display: grid;
`;
