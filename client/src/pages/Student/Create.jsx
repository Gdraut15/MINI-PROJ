import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from 'styled-components'; // Import styled-components
import StudentNavbar from '../../components/StudentNavbar';

const CreateContainer = styled.div`
  max-width: 4000000px;
  margin: 0 auto;
  text-align: center;
`;

const CreateLabel = styled.label`
  text-align: left;
  display: block;
`;

const CreateTitle = styled.h2`
  font-size: 20px;
  color: blue;
  margin-bottom: 30px;
`;

const CreateInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;

const CreateTextarea = styled.textarea`
  width: calc(100% - 20px); /* Adjusted width */
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;

const CreateSelect = styled.select`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;

const CreateButton = styled.button`
  background: blue;
  color: #fff;
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
`;

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch('http://localhost:7700/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      navigate('/'); // Use navigate instead of history.push
    })
  }

  return (
    <CreateContainer>
      <StudentNavbar/>
      <CreateTitle>Add Notes</CreateTitle>
      <form onSubmit={handleSubmit}>
        <CreateLabel>Title:</CreateLabel>
        <CreateInput 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CreateLabel>Body:</CreateLabel>
        <CreateTextarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></CreateTextarea>
        <CreateLabel>Uploaded By:</CreateLabel>
        <CreateSelect
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </CreateSelect>
        <CreateButton>Upload</CreateButton>
      </form>
    </CreateContainer>
  );
}
 
export default Create;
