import React, { Fragment } from 'react';
import {
  ImagesWrapper,
  InstaImg,
  InstaTitle,
  SingleImageWrapper,
  SocialsWrapper,
  SocialsTitle,
  TitleContinuation,
} from './socials.styles';
import { AppConsts } from '../../constants';

const Socials: React.FC = () => {
  const generateImages = () => {
    return [0, 1, 2, 3].map(_ => {
      return (
        <a href="https://www.w3schools.com" target="_blank" rel="noopener noreferrer">
          <SingleImageWrapper>
            <InstaImg style={{ backgroundImage: `url(assets/images/socials/socials${_}.png)` }} />
            <InstaTitle>abc</InstaTitle>
          </SingleImageWrapper>
        </a>
      );
    });
  };

  return (
    <Fragment>
      <SocialsWrapper>
        <TitleContinuation>
          <SocialsTitle>{AppConsts.APP_TITLE}</SocialsTitle> na instagramie
        </TitleContinuation>
        <ImagesWrapper>{generateImages()}</ImagesWrapper>
      </SocialsWrapper>
    </Fragment>
  );
};

export default Socials;
