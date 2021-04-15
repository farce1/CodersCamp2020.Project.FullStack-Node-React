import styled from 'styled-components';

export const SocialsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  background: transparent;
`;

export const SocialsTitle = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 64px;
  letter-spacing: 0.08em;
  color: #313030;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TitleContinuation = styled(SocialsTitle)`
  color: #9093a6;
  padding-left: 1rem;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
`;

export const SingleImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 3px;

  &:hover div {
    -ms-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 0.5;
  }
  &:hover span {
    opacity: 1;
  }
`;

export const InstaImg = styled.div`
  margin: 5px;
  width: 196px;
  height: 199px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
`;

export const InstaTitle = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: #313030;
  opacity: 0;
  transition: all 0.5s;
  text-align: center;
`;
