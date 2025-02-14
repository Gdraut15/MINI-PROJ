import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import styled from 'styled-components';
import { MailOutline, Phone, PhoneIphone, SupervisorAccount } from '@material-ui/icons';
import StudentNavbar from '../../components/StudentNavbar';
import { studentUpdate} from '../../redux/actions/studentAction';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
`;

const ProfileBox = styled.div`
  background-color: white;
  width: 25vw;
  height: 70vh;
  box-sizing: border-box;
`;

const ProfileHeader = styled.h1`
  text-align: center;
  color: #0077b6;
  font: 400 1.3vmax;
  padding: 1.3vmax;
  border-bottom: 1px solid #0077b6;
  width: 50%;
  margin: auto;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: auto;
  padding: 2vmax;
  height: 70%;
  > div {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

const ProfileName = styled.div`
  position: relative;
  > svg {
    position: absolute;
    left: 10px;
    font-size: 1.6vmax;
  }
`;

const ProfileEmail = styled.div`
  position: relative;
  > svg {
    position: absolute;
    left: 10px;
    font-size: 1.6vmax;
  }
`;

const ProfilePhone = styled.div`
  position: relative;
  > svg {
    position: absolute;
    left: 10px;
    font-size: 1.6vmax;
  }
`;

const ProfileInput = styled.input`
  padding: 1vmax 4vmax;
  padding-right: 1vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #0077b6;
  border-radius: 4px;
  font: 300 0.9vmax;
  outline: none;
`;

const ProfileButton = styled.button`
  border: none;
  background-color: #0077b6;
  color: white;
  font: 300 0.9vmax;
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
`;

const StudentUpdateProfile = () => {
  const student = useSelector((store) => store.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [email, setEmail] = useState(student.student.email);
  const [mobile, setMobile] = useState(student.student.studentMobileNumber);
  const [fatherName, setFatherName] = useState(student.student.fatherName);
  const [fatherMobile, setFatherMobile] = useState(student.student.fatherMobileNumber);

  const fileHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('studentMobileNumber', mobile);
    myForm.append('email', email);
    myForm.append('fatherName', fatherName);
    myForm.append('fatherMobileNumber', fatherMobile);
    myForm.append('registrationNumber', student.student.registrationNumber);
  
    try {
      await dispatch(studentUpdate(myForm));
      alert.success('Profile updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating profile: ', error);
      alert.error('Failed to update profile');
    }
  };
  

  return (
    <>
      <StudentNavbar />
      <Container>
        <ProfileBox>
          <ProfileHeader>Update Profile</ProfileHeader>
          <ProfileForm encType='multipart/form-data' onSubmit={fileHandler}>
            <ProfileEmail>
              <MailOutline />
              <ProfileInput
                type='text'
                placeholder='Email'
                required
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </ProfileEmail>
            <ProfilePhone>
              <Phone />
              <ProfileInput
                type='text'
                placeholder='Student Mobile'
                required
                name='studentMobileNumber'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </ProfilePhone>
            <ProfileName>
              <SupervisorAccount />
              <ProfileInput
                type='text'
                placeholder='Father Name'
                required
                name='fatherName'
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </ProfileName>
            <ProfilePhone>
              <PhoneIphone />
              <ProfileInput
                type='text'
                placeholder='Father Mobile'
                required
                name='fatherMobileNumber'
                value={fatherMobile}
                onChange={(e) => setFatherMobile(e.target.value)}
              />
            </ProfilePhone>
            <ProfileButton type='submit'>Update Profile</ProfileButton>
          </ProfileForm>
        </ProfileBox>
      </Container>
    </>
  );
};

export default StudentUpdateProfile;
