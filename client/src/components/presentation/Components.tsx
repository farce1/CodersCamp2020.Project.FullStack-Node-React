import React from 'react'
import { IProps, ITypeOfService } from './interfaces/interfaces'

import {
  TypeOfServiceStyle,
  TypeDetailStyle,
  BoldTypeDetailStyle,
  InformationStyle,
  InformationItemStyle,
} from './styles'

export const Information = ({ image, content }: IProps) => {
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
export const TypeOfService = ({ header, content }: ITypeOfService) => {
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
