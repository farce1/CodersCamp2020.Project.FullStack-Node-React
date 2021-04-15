import React, { Fragment } from 'react';
import Carousel from 'react-multi-carousel';
import { useSelector } from 'react-redux';

import { getRestaurantsState } from '../../selectors';
import { Restaurant } from '../../../../server/src/interfaces/restaurant.interface';
import { LogoImg, PhotoImg, PhotoWrapper, SliderTitle } from './slider.styles';

const Slider: React.FC = () => {
  const restaurantsWithSiteData = useSelector(getRestaurantsState).filter(
    (restaurant: Restaurant) =>
      restaurant.siteUrl?.page &&
      restaurant.siteUrl?.page !== null &&
      restaurant.siteUrl?.photo &&
      restaurant.siteUrl?.photo !== null &&
      restaurant.siteUrl?.logo &&
      restaurant.siteUrl?.logo !== null
  );

  const uniqueNumbers: any[] = [];
  const maxlengthOfRestaurantsList = 10;
  const minlengthOfRestaurantsList = 4;
  let numberToSelect = minlengthOfRestaurantsList;

  if (restaurantsWithSiteData.length > 0 && restaurantsWithSiteData.length >= minlengthOfRestaurantsList) {
    if (restaurantsWithSiteData.length === minlengthOfRestaurantsList) {
      numberToSelect = minlengthOfRestaurantsList;
    } else if (
      restaurantsWithSiteData.length > minlengthOfRestaurantsList &&
      restaurantsWithSiteData.length < maxlengthOfRestaurantsList
    ) {
      numberToSelect = restaurantsWithSiteData.length;
    } else {
      numberToSelect = maxlengthOfRestaurantsList;
    }

    while (uniqueNumbers.length < numberToSelect) {
      const randomNumber = Math.floor(Math.random() * restaurantsWithSiteData.length);
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
  }

  const uniqueRestaurantsToDisplay = uniqueNumbers.map(number => {
    return restaurantsWithSiteData[number];
  });

  const generateImages = () => {
    const useExistingRestaurants = () => {
      return uniqueRestaurantsToDisplay.map(restaurant => {
        return (
          <a key={restaurant?.email} href={restaurant?.siteUrl?.page ?? ''} target="_blank" rel="noopener noreferrer">
            <PhotoWrapper>
              <PhotoImg style={{ backgroundImage: `url(${restaurant?.siteUrl?.photo})` }} />
              <LogoImg style={{ backgroundImage: `url(${restaurant?.siteUrl?.logo})` }} />
            </PhotoWrapper>
          </a>
        );
      });
    };

    const usePlaceholder = () => {
      return [0, 1, 2, 3].map(num => {
        return (
          <a key={num} href={window.location.hash}>
            <PhotoWrapper>
              <PhotoImg style={{ backgroundImage: `url("assets/images/slider/photo${num}.png")` }} />
              <LogoImg style={{ backgroundImage: `url("assets/images/slider/logo${num}.PNG")` }} />
            </PhotoWrapper>
          </a>
        );
      });
    };

    return restaurantsWithSiteData.length >= 4 ? useExistingRestaurants() : usePlaceholder();
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };
  return (
    <Fragment>
      <SliderTitle>Restauracje</SliderTitle>
      <div
        style={{
          margin: '5px 0 20px 0',
        }}
      >
        <Carousel ssr partialVisbile itemClass="image-item" responsive={responsive}>
          {generateImages()}
        </Carousel>
      </div>
    </Fragment>
  );
};

export default Slider;
