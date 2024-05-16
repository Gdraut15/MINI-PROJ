import styled from 'styled-components';
import BlogList from "./BlogList";
import { Link } from "react-router-dom"; // Add this line to import Link
import useFetch from "./useFetch";
import StudentNavbar from '../../components/StudentNavbar';

const HomeContainer = styled.div`
  max-width: 100000000000px;
  margin: 10px auto;
  padding: 0px;
`;
const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const LoadingMessage = styled.div`
  color: #333;
`;

const CreateBlogButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  color: #fff;
  background-color: blue;
  padding: 10px 20px;
  border-radius: 5px;
`;

const Blog = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:7700/blogs');

  return (
    <HomeContainer>
      <StudentNavbar/>
      <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isPending && <LoadingMessage>Loading...</LoadingMessage>}
      {blogs && <BlogList blogs={blogs} />}
      <CreateBlogButton to="/create">Upload Notes</CreateBlogButton>
      </Container>
    </HomeContainer>
  );
}

export default Blog;
