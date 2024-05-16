import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import useFetch from "./useFetch";
import styled from 'styled-components';

const BlogDetailsContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const LoadingMessage = styled.div`
  color: #333;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const Article = styled.article`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: blue;
  margin-bottom: 10px;
`;

const Author = styled.p`
  color: #666;
`;

const Body = styled.div`
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background: #f1356d;
  color: #fff;
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
`;

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:7700/blogs/' + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:7700/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    }) 
  }

  return (
    <BlogDetailsContainer>
      {isPending && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {blog && (
        <Article>
          <Title>{blog.title}</Title>
          <Author>Written by {blog.author}</Author>
          <Body>{blog.body}</Body>
          <DeleteButton onClick={handleClick}>Delete</DeleteButton>
        </Article>
      )}
    </BlogDetailsContainer>
  );
}

export default BlogDetails;
