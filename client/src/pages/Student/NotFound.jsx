import { Link } from "react-router-dom";
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #f1356d;
`;

const Message = styled.p`
  color: #333;
`;

const BackLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    color: #f1356d;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>Sorry</Title>
      <Message>That page cannot be found</Message>
      <BackLink to="/">Back to the homepage...</BackLink>
    </NotFoundContainer>
  );
}

export default NotFound;
