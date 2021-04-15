import styled from 'styled-components';

export const SliderTitle = styled.span`
  margin-left: 2rem;
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 64px;
  letter-spacing: 0.08em;
  color: #3f4255;
`;

export const PhotoWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 3px;

  // &:hover div {
  //   -ms-transform: scale(1.2);
  //   -moz-transform: scale(1.2);
  //   -webkit-transform: scale(1.2);
  //   -o-transform: scale(1.2);
  //   transform: scale(1.2);
  //   opacity: 0.5;
  // }
  // &:hover span {
  //   opacity: 1;
  // }
`;

export const PhotoImg = styled.div`
  margin-top: 5px;
  width: 296px;
  height: 184px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: drop-shadow(0px 2px 16px rgba(60, 62, 74, 0.08));
  border-radius: 4px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
`;

export const LogoImg = styled.div`
  margin-bottom: 5px;
  width: 296px;
  height: 85px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: drop-shadow(0px 2px 16px rgba(60, 62, 74, 0.08));
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
`;
