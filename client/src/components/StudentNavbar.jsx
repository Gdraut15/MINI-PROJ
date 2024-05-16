import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { Person, Dashboard, Ballot, ExitToApp, Group, Feedback, Message } from '@material-ui/icons';
import styled from 'styled-components';

import { studentLogout } from '../redux/actions/studentAction';
import StudentFeedback from '../pages/Student/StudentFeedback';

const Container = styled.div`
  width: 100vw;
  display: flex;
  border-bottom: 0.5px solid #0077b6;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: white;
  width: 100%;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  > a {
    text-decoration: none;
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #0077b6;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  position: relative;
  a {
    text-decoration: none;
    color: white;
  }
`;

const IconBadge = styled.span`
  width: 15px;
  height: 15px;
  background-color: tomato;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const StudentNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const alert = useAlert();

  const student = useSelector((store) => store.student);

  useEffect(() => {
    if (student.student.student.name) {
      nameHandler();
    }
  }, [student.student.student.name]);

  const logoutHandler = () => {
    dispatch(studentLogout());
    navigate('/');
    alert.success("Student Logout Successful");
  };

  const nameHandler = () => {
    setName(student.student.student.name);
  };

  const home = () => {
    navigate('/home');
  };

  const updateProfile = () => {
    navigate('/student/update');
  };

  const subjectList = () => {
    navigate('/student/subjects');
  };

  const marksList = () => {
    navigate('/student/performance');
  };

  const attendance = () => {
    navigate('/student/attendance');
  };

  const goToStudentFeedback = () => {
    navigate('/student/studentFeedback');
  };

  const goToBlog = () => {
    navigate('/student/blog'); 
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>Student Registration Portal</Logo>
          </Link>
        </Left>
        <Right>
          <MenuItem>
            <Person onClick={updateProfile} style={{ color: "#0077b6" }} />
          </MenuItem>
          <MenuItem>
            <Dashboard onClick={marksList} style={{ color: "#0077b6" }} />
          </MenuItem>
          <MenuItem>
            <Group onClick={attendance} style={{ color: "#0077b6" }} />
          </MenuItem>
          <MenuItem>
            <Ballot onClick={subjectList} style={{ color: "#0077b6" }} />
          </MenuItem>
          <MenuItem>
            <Feedback onClick={goToStudentFeedback} style={{ color: "#0077b6" }} /> 
          </MenuItem>
          <MenuItem>
            <Message onClick={goToBlog} style={{ color: "#0077b6" }} />
          </MenuItem>
          <MenuItem>
            <ExitToApp onClick={logoutHandler} style={{ color: "#0077b6" }} />
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default StudentNavbar;
