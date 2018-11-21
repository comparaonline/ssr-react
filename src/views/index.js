import React, { Component } from 'react';
import PropTypes from 'prop-types';

import img from 'Assets/img/200.png';
import 'Assets/css/styles.css';
import Dee from './common/Dee';

import UniversalComponent from './UniversalComponent';

class App extends Component {
  constructor(props) {
    super(props);
    const { history } = props;
    const { location: { pathname } } = history;

    let page = null;

    switch (pathname) {
      case '/route/c':
        page = 'Bar';
        break;

      case '/route/d':
        page = 'Foo';
        break;

      case '/route/apollo/a':
        page = 'ApolloBar';
        break;

      case '/route/apollo/b':
        page = 'ApolloFoo';
        break;

      default:
        page = 'Bar';
        break;
    }

    this.state = { page };
  }

  onClick = (page) => {
    this.setState({
      page,
    });
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        <h1>Universal Component</h1>
        <UniversalComponent page={`common/${page}`} />
        <button onClick={() => this.onClick('Bar')}>Bar</button>
        <button onClick={() => this.onClick('Foo')}>Foo</button>
        <button onClick={() => this.onClick('ApolloBar')}>ApolloBar</button>
        <button onClick={() => this.onClick('ApolloFoo')}>ApolloFoo</button>
        <img src={img} alt="" style={{ display: 'block', marginTop: '30px' }} />
        <Dee title="baz" times={12} />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default App;
