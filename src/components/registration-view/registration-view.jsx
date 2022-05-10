import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  //validate user inputs
  const getUsernameError = () => {
    if (!username) {
      return "Username required"
    } else if (username.length < 5) {
      return "Username must be 5 characters long"
    } else {
      return null
    }
  }
  
  const getPasswordError = () => {
    if (!password) {
      return "Password required"
    } else if (password.length < 5) {
      return "Password must be 5 characters long"
    } else {
      return null
    }
  }

  const getEmailError = () => {
    if(!email) {
      return "Email required"
    } else if ((email.indexOf('@') === -1)) {
      return "Invalid email"
    } else {
      return null
    }
  }

  const getBirthdayError = () => {
    const regexddmmyyyy = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
    if(!birthday) {
      return "Birthday required"
    } else if (!regexddmmyyyy.test(birthday)){
      return "Invalid date"
    } else  {
      return null
    }
  }

  const validate = () => {
    
    let usernameError = getUsernameError();
    let passwordError = getPasswordError();
    let emailError = getEmailError();
    let birthdayError = getBirthdayError();

    setUsernameErr(usernameError);
    setPasswordErr(passwordError);
    setEmailErr(emailError);
    setBirthdayErr(birthdayError);

    return !usernameError && !passwordError && !emailError && !birthdayError
  };

  /*
  const validate = () => {
    let isReq = true;
    const regexddmmyyyy = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5){
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr('Password must be 5 characters long');
      isReq = false;
    }
    if(!email){
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Invalid Email');
      isReq = false;
    }
    if(!birthday){
      setBirthdayErr('Birthday Required');
      isReq = false;
    } else if (!regexddmmyyyy.test(birthday)) {
      setBirthdayErr('Invalid Date');
      isReq = false;
    }

    return isReq;
  }*/

  const handleSubmit = (e) => {
    e.preventDefault();

  const isReq = validate();
    if(isReq)

    axios
      .post('https://my-flix-movie-app.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        birthday: birthday
      })
      .then(response => {
        //take the response data received and pass as argument to onLoggedin funcion (whose gonna write in console)
        const data = response.data;
        props.onRegistration(data);
      })
      .catch((response) => {
        console.error(response);
        alert('unable to register');
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label> Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{emailErr && <p>{emailErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />{birthdayErr && <p>{birthdayErr}</p>}
      </Form.Group>

      <Button
        className="btn-primary"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Card className="login-card">
        <Card.Body>
          <Card.Text>Already have an account?</Card.Text>

          <Button
            className="btn-outline"
            variant="outline-primary"
            onClick={() => {
              props.onBackClick(null);
            }}
          >
            Login
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.string,
  onBackClick: PropTypes.func.isRequired,
};
