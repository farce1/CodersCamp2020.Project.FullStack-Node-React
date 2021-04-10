import React from 'react'
import styled from 'styled-components'
import delivery from './images/delivery.png'
import time from './images/time-eat.png'
import favourite from './images/favourite.png'
import salad from './images/salad.png'

const TypeOfServiceStyle = styled.div`
  border: solid 2px #fcd303;
  padding: 10px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`
const TypeDetailStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const BoldTypeDetailStyle = styled(TypeDetailStyle)`
  font-weight: bold;
`
const MainDivStyle = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: auto auto auto;
  padding: 50px;
  position: relative;
`
const HeadingStyle = styled.h1`
  width: 80%;
  font-size: 50px;
  font-family: Lato;
  font-weight: 200;
  margin-bottom: 80px;
  padding-left: 50px;
`
const TypeMainDivStyle = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: left;
  margin-left: 10px;
  gap: 20px;
  padding-left: 30px;
`
const InformationStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 180px;
  justify-content: center;
  margin: 5px;
`
const InformationItemStyle = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`
const InformationContainerStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 60%;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.75);
  justify-content: center;
`
const SaladStyles = styled.div`
  width: 100%;
  grid-column: 2;
  grid-row: 1 / span 2;
`
const GreetingStyles = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  align-items: center;
  justify-items: center;
`
const FooterStyles = styled.div`
  grid-column: 1 / span 2;
  grid-row: 3;
  align-items: start;
`
const ImgStyles = styled.img`
  width: 100%;
`

function Information({ image, content }: IProps) {
  return (
    <InformationStyle>
      <InformationItemStyle>
        <div>
          <img src={image} alt="" />
        </div>
      </InformationItemStyle>
      <InformationItemStyle>
        <div>{content}</div>
      </InformationItemStyle>
    </InformationStyle>
  )
}
function TypeOfService({ header, content }: ITypeOfService) {
  return (
    <TypeOfServiceStyle>
      <BoldTypeDetailStyle>
        <div>{header}</div>
      </BoldTypeDetailStyle>
      <TypeDetailStyle>
        <div>{content}</div>
      </TypeDetailStyle>
    </TypeOfServiceStyle>
  )
}

interface IProps {
  image: string
  content: string
}
interface ITypeOfService {
  header: string
  content: string
}

export function Presentation() {
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
