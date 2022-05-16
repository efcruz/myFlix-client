import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

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

  const validate = () => {

    let usernameError = getUsernameError()
    let passwordError = getPasswordError()

    setUsernameErr(usernameError)
    setPasswordErr(passwordError)

    return !usernameError && !passwordError
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    

    const isReq = validate();
    if(isReq)

    //Sends a request to the server for authentication
    axios
      .post('https://my-flix-movie-app.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then(response => {
        //take the response data received and pass as argument to onLoggedin funcion (whose gonna write in console)
        const authData = response.data;
        props.onLoggedIn(authData);
      })
      .catch((e) => {
        console.log('no such user');
        alert('No such user!')
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUsername" onSubmit={handleSubmit}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter username"
          required
          value = {username}
          onChange={(e) => setUsername(e.target.value)}
        /> 
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="enter password"
          required
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Button
        className="btn-primary"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
};
