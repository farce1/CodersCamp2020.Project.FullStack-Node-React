import styled from 'styled-components';

export const TypeOfServiceStyle = styled.div`
  border: solid 2px #fcd303;
  padding: 10px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
export const TypeDetailStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const BoldTypeDetailStyle = styled(TypeDetailStyle)`
  font-weight: bold;
`;
export const MainDivStyle = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: auto auto auto;
  padding: 50px;
  position: relative;
`;
export const HeadingStyle = styled.h1`
  width: 80%;
  font-size: 50px;
  font-family: Lato;
  font-weight: 200;
  margin-bottom: 80px;
  padding-left: 50px;
`;
export const TypeMainDivStyle = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: left;
  margin-left: 10px;
  gap: 20px;
  padding-left: 30px;
`;
export const InformationStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 180px;
  justify-content: center;
  margin: 5px;
`;
export const InformationItemStyle = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
export const InformationContainerStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 60%;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.75);
  justify-content: center;
`;
export const SaladStyles = styled.div`
  width: 100%;
  grid-column: 2;
  grid-row: 1 / span 2;
`;
export const GreetingStyles = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  align-items: center;
  justify-items: center;
`;
export const FooterStyles = styled.div`
  grid-column: 1 / span 2;
  grid-row: 3;
  align-items: start;
`;
export const ImgStyles = styled.img`
  width: 100%;
`;
