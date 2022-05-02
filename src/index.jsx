import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

//Fixing "ReactDOM.render is no longer supported in React 18"
/*import App from 'App';*/

/*const root = ReactDOM.createRoot(document.getElementById('root'));*/
/*root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);*/

import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <Navbar fluid="true" variant="dark" fixed="top" bg="dark">
          <Container>
            <Navbar.Brand href="#home">myFlix</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Profile</Nav.Link>
              <Nav.Link href="#pricing">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br></br>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
