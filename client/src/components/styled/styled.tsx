// import React from 'react';

import styled from 'styled-components'

export const Input = styled.section`
  padding-left: 1em;
  padding-right: 1em;
  background: #FFFFFF;
  width: 50%;
  box-sizing: border-box;
  box-shadow: 0 0 5px 5px #d7d7d7;
  margin-top: 1.5em;
  font-size: 0.5em;
  color: red;
  @media (max-width: 750px) {
    width: 90%;
  }
`

export const Flex = styled.section`
  padding-left: 1em;
  padding-right: 1em;
  background: #FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`

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
`

export const Anchor = styled.a`
  text-decoration: none;
  color: #555555;
`

export const Button = styled.button`
  display: inline-block;
  color: #b79c10;
  background: #ffe145;
  font-size: 1em;
  border-radius: 10px;
  border: #ffe145;
  display: block;
  padding: 1em;
  justify-items: center;
  margin: 1em;
  box-sizing: border-box;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

export const Form = styled.form`
  text-align: center;
  display: grid;
  width: 100%;
  justify-items: center;
  justify-self: center;
  box-sizing: border-box;
`

export const Wrapper = styled.section`
  display: grid;
  width: 70%;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: stretch;
  justify-self: center;
  background: #FFFFFF;
  text-align: center;
  color: #555555;
  box-shadow: 0 0 5px 5px #d7d7d7;
  box-sizing: border-box;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 1em;
`

export const Div = styled.section`
  width: 100%;
  display: grid;
`

export const CheckboxWrapper = styled.section`
  width: 40%;
  display: grid;
  margin-top: 1em;
  justify-content: center;
  color: red;
  font-size: 0.5em;
  box-sizing: border-box;
  padding-top: 1em;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const Checkbox = styled.input`
  box-sizing: border-box;
  display: grid;
  &:checked {
    opacity: 1;
    cursor: pointer;
  }
  &:not(:checked) {
    opacity: 1;
  }
  @media (max-width: 900px) {
    margin-right: 2em;
  }
`
export const WrapperFatal = styled.section`
  background: #FFFFFF;
  font-size: 1.5em;
  text-align: center;
  color: #555555;
  box-shadow: 0 0 5px 5px #d7d7d7;
  box-sizing: border-box;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 2em;
  justify-items: center;
  display: flex;
  flex-direction: column;
`
export const Paragraph = styled.p`
  font-size: 1em;
  text-align: center;
  box-sizing: border-box;
  margin-top: 0.5em;
  margin-bottom: 1em;
  color: red;
`

export const Columns = styled.section`
  padding-left: 1em;
  padding-right: 1em;
  background: #FFFFFF;
  display: grid;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`

export const Sukcces = styled.p`
  padding: 0.2em;
  background: #FFFFFF;
  display: grid;
  justify-content: center;
  width: 80%;
  box-sizing: border-box;
  color: #32CD32;
  box-shadow: 0 0 5px 5px #32CD32;
`
