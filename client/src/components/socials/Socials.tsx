import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
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
import { getRestaurantsState } from '../../selectors';
import { Restaurant } from '../../../../server/src/interfaces/restaurant.interface';

const Socials: React.FC = () => {
  const restaurantsWithSocials = useSelector(getRestaurantsState).filter(
    (restaurant: Restaurant) => restaurant.socials?.instagram && restaurant.socials?.socialImage
  );
  const uniqueNumbers: any[] = [];
  if (restaurantsWithSocials.length > 0) {
    while (uniqueNumbers.length < 4) {
      const randomNumber = Math.floor(Math.random() * restaurantsWithSocials.length);
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
  }
  const uniqueRestaurantsToDisplay = uniqueNumbers.map(number => {
    return restaurantsWithSocials[number];
  });
  console.log('uniqueNumbers', uniqueNumbers);
  console.log('uniqueRestaurantsToDisplay', uniqueRestaurantsToDisplay);
  console.log('restaurantsWithSocials: ', restaurantsWithSocials);

  const generateImages = () => {
    const useExistingRestaurants = () => {
      return uniqueRestaurantsToDisplay.map(restaurant => {
        return (
          <a
            key={restaurant.socials.instagram}
            href={restaurant.socials.instagram ?? ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SingleImageWrapper>
              <InstaImg style={{ backgroundImage: `url(${restaurant.socials.socialImage})` }} />
              <InstaTitle>{restaurant.name}</InstaTitle>
            </SingleImageWrapper>
          </a>
        );
      });
    };

    const usePlaceholder = () => {
      return [0, 1, 2, 3].map(num => {
        return (
          <a key={num} href={window.location.hash}>
            <SingleImageWrapper>
              <InstaImg style={{ backgroundImage: `url("assets/images/socials/socials${num}.png")` }} />
              <InstaTitle>Tu się pojawi instagram restauracji</InstaTitle>
            </SingleImageWrapper>
          </a>
        );
      });
    };
    console.log(restaurantsWithSocials.length > 3);
    return restaurantsWithSocials.length > 3 ? useExistingRestaurants() : usePlaceholder();
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
