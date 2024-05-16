import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogListContainer = styled.div`
  .blog-preview {
    padding: 10px 16px;
    margin: 20px 0;
    border-bottom: 1px solid #fafafa;
    transition: box-shadow 0.3s ease;
  }

  .blog-preview:hover {
    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
  }

  h2 {
    font-size: 20px;
    color: blue;
    margin-bottom: 8px;
  }

  p {
    color: blue;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  a:hover {
    color: #f1356d;
  }
`;

const BlogList = ({ blogs }) => {
  return (
    <BlogListContainer>
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </BlogListContainer>
  );
}

export default BlogList;
