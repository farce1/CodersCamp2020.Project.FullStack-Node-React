import React, { Fragment } from 'react';
import Carousel from 'react-multi-carousel';

// import { useSelector } from 'react-redux';
// import { getRestaurantsState } from '../../selectors';
// import { Restaurant } from '../../../../server/src/interfaces/restaurant.interface';
import { LogoImg, PhotoImg, PhotoWrapper, SliderTitle } from './slider.styles';

const Slider: React.FC = () => {
  // const restaurantsWithSocials = useSelector(getRestaurantsState).filter(
  //     (restaurant: Restaurant) => restaurant.socials?.instagram && restaurant.socials?.socialImage
  // );
  // const uniqueNumbers: any[] = [];
  // if (restaurantsWithSocials.length > 0) {
  //     while (uniqueNumbers.length < 4) {
  //         const randomNumber = Math.floor(Math.random() * restaurantsWithSocials.length);
  //         if (!uniqueNumbers.includes(randomNumber)) {
  //             uniqueNumbers.push(randomNumber);
  //         }
  //     }
  // }
  // const uniqueRestaurantsToDisplay = uniqueNumbers.map(number => {
  //     return restaurantsWithSocials[number];
  // });
  // console.log('uniqueNumbers', uniqueNumbers);
  // console.log('uniqueRestaurantsToDisplay', uniqueRestaurantsToDisplay);
  // console.log('restaurantsWithSocials: ', restaurantsWithSocials);

  const generateImages = () => {
    // const useExistingRestaurants = () => {
    //     return uniqueRestaurantsToDisplay.map(restaurant => {
    //         return (
    //             <a
    //                 key={restaurant.socials.instagram}
    //                 href={restaurant.socials.instagram ?? ''}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //             >
    //                 <SingleImageWrapper>
    //                     <InstaImg style={{ backgroundImage: `url(${restaurant.socials.socialImage})` }} />
    //                     <InstaTitle>{restaurant.name}</InstaTitle>
    //                 </SingleImageWrapper>
    //             </a>
    //         );
    //     });
    // };

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
    //  console.log(restaurantsWithSocials.length > 3);
    // return restaurantsWithSocials.length > 3 ? useExistingRestaurants() : usePlaceholder();
    return usePlaceholder();
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
