import React, { Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';

// import { useSelector } from 'react-redux';
// import { getRestaurantsState } from '../../selectors';
// import { Restaurant } from '../../../../server/src/interfaces/restaurant.interface';
import { LogoImg, PhotoImg, PhotoWrapper, SliderTitle, SliderWrapper } from './slider.styles';

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

  return (
    <Fragment>
      <SliderWrapper>
        <SliderTitle>Restauracje</SliderTitle>

          {/* <RestaurantsWrapper> */}
            <Carousel>
              {generateImages()}
            </Carousel>

          {/* </RestaurantsWrapper> */}

      </SliderWrapper>
    </Fragment>
  );
};

export default Slider;
