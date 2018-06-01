import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import App from '../views';

// console.log('NODE_ENV', process.env.NODE_ENV);

const history = createHistory();

const render = (AppComponent) => {
  ReactDOM.hydrate(
    <AppComponent history={history} />,
    document.getElementById('root')
  );
};

render(App);
