import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

//Fixing "ReactDOM.render is no longer supported in React 18"
/*import App from 'App';*/

/*const root = ReactDOM.createRoot(document.getElementById('root'));*/
/*root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);*/

import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const myFlixStore = createStore(moviesApp, devToolsEnhancer(
  {trace: true}
));

/*const myFlixStore = createStore(moviesApp, devToolsEnhancer());*/

myFlixStore.subscribe(() => console.log(myFlixStore.getState()));

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={myFlixStore}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
