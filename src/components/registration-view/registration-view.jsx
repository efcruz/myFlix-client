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

  const validate = () => {
    
    let usernameError = getUsernameError();
    let passwordError = getPasswordError();
    let emailError = getEmailError();

    setUsernameErr(usernameError);
    setPasswordErr(passwordError);
    setEmailErr(emailError);
 

    return !usernameError && !passwordError && !emailError
  };

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
        console.log(data);
        window.open('/', '_self');
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
        />{usernameErr && <p className='error-message'>{usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{passwordErr && <p className='error-message'>{passwordErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{emailErr && <p className='error-message'>{emailErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button
        className="btn-primary"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.instanceOf(Date).isRequired,
  }),
};
