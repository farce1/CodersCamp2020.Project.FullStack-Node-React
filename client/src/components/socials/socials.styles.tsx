import styled from 'styled-components';

export const SocialsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  background: papayawhip;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
`;

export const InstaImg = styled.div`
  margin: 5px;
  width: 196px;
  height: 199px;
  border-radius: 3px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const Title = styled.span`
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 64px;
  letter-spacing: 0.08em;
  color: #313030;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TitleContinuation = styled(Title)`
  color: #9093a6;
  padding-left: 35px;
`;
