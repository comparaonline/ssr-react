import React from 'react';
import ReactDOM from 'react-dom';

console.log('NODE_ENV', process.env.NODE_ENV);


const App = () => <div>React app</div>;

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
