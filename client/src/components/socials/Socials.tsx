import React, { Fragment } from 'react';
import { ImagesWrapper, InstaImg, SocialsWrapper, Title, TitleContinuation } from './socials.styles';
import { AppConsts } from '../../constants';

const Socials: React.FC = () => {
  const generateImages = () => {
    return [0, 1, 2, 3].map(_ => {
      return <InstaImg style={{ backgroundImage: `url(assets/images/socials/socials${_}.png)` }} />;
    });
  };
  return (
    <Fragment>
      <SocialsWrapper>
        <TitleContinuation>
          <Title>{AppConsts.APP_TITLE}</Title> na instagramie
        </TitleContinuation>
        <ImagesWrapper>{generateImages()}</ImagesWrapper>
      </SocialsWrapper>
    </Fragment>
  );
};

export default Socials;
