import React, { useState } from 'react';
import styled from 'styled-components';
import StudentNavbar from '../../components/StudentNavbar';

const Container = styled.div`
    max-width: 6000000px;
    margin-top:Opx;
    background-color: #ffffff; /* White box */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    border-radius: 10px;
    overflow: hidden; /* Ensure content doesn't overflow */
`;

const Title = styled.h1`
    text-align: center;
    color: #000000; /* Black text */
`;

const FormGroup = styled.div`
    text-align:center;
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #000000; /* Black text */
`;

const Input = styled.input`
    width: 40%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #007bff; /* Bootstrap primary blue */
    color: #000000; /* Black text */
`;

const Select = styled.select`
    width: 40%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #007bff; /* Bootstrap primary blue */
    color: #000000; /* Black text */
`;

const Textarea = styled.textarea`
    width: 40%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #007bff; /* Bootstrap primary blue */
    color: #000000; /* Black text */
    resize: vertical;
`;

const Button = styled.button`
    background-color: #007bff; /* Bootstrap primary blue */
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3; /* Darker blue */
    }
`;

const Form = styled.form`
    margin-top: 20px; /* Add margin to the top */
`;

const StudentFeedback = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        teacherName: '',
        course: '',
        rating: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.studentName && formData.teacherName && formData.course && formData.rating && formData.comments) {
            console.log('Feedback submitted:', formData);
            alert('Thank you for your feedback!');
            setFormData({
                studentName: '',
                teacherName: '',
                course: '',
                rating: '',
                comments: ''
            });
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <Container>
            <StudentNavbar/>
            <Title>Teacher Feedback Form</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="studentName">Student Name:</Label>
                    <Input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="teacherName">Teacher Name:</Label>
                    <Input
                        type="text"
                        id="teacherName"
                        name="teacherName"
                        value={formData.teacherName}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="course">Course:</Label>
                    <Input
                        type="text"
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="rating">Rating:</Label>
                    <Select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a rating</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="comments">Comments:</Label>
                    <Textarea
                        id="comments"
                        name="comments"
                        rows="4"
                        value={formData.comments}
                        onChange={handleChange}
                        required
                    ></Textarea>
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Submit</Button>
                </FormGroup>
            </Form>
        </Container>
    );
};

export default StudentFeedback;
