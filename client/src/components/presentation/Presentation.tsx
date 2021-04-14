import React from 'react'

import {
  MainDivStyle,
  HeadingStyle,
  TypeMainDivStyle,
  InformationContainerStyle,
  SaladStyles,
  GreetingStyles,
  FooterStyles,
  ImgStyles,
} from './styles'

import delivery from './images/delivery.png'
import time from './images/time-eat.png'
import favourite from './images/favourite.png'
import salad from './images/salad.png'
import { Information, TypeOfService } from './Components'

export const Presentation = () => {
  return (
    <MainDivStyle>
      <GreetingStyles>
        <HeadingStyle>Otwarte restauracje w czasie pandemii</HeadingStyle>
        <TypeMainDivStyle>
          <TypeOfService header="Delivery" content="Order in" />
          <TypeOfService header="Takeout" content="Grab and go" />
        </TypeMainDivStyle>
      </GreetingStyles>
      <FooterStyles>
        {' '}
        <InformationContainerStyle>
          <Information
            image={time}
            content="Szybki kontakt bezpośrednio z restauracją!"
          />
          <Information
            image={delivery}
            content="Dowiesz się gdzie zjesz w środku!"
          />
          <Information
            image={favourite}
            content="Twoje ulubione restauracje w jednym miejscu!"
          />
        </InformationContainerStyle>
      </FooterStyles>
      <SaladStyles>
        <ImgStyles src={salad} />
      </SaladStyles>
    </MainDivStyle>
  )
}
