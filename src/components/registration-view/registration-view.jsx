import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
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
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
