import React, { Component } from 'react';
import universal from 'react-universal-component';

import img from 'Assets/img/200.png';

const UniversalComponent = universal(props => import(`./common/${props.page}`), {
  minDelay: 200,
});

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
    })
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        <h1>Universal Component</h1>
        <UniversalComponent page={page} />
        <button onClick={() => this.onClick('Bar')}>Bar</button>
        <button onClick={() => this.onClick('Foo')}>Foo</button>
        <button onClick={() => this.onClick('ApolloBar')}>ApolloBar</button>
        <button onClick={() => this.onClick('ApolloFoo')}>ApolloFoo</button>
        <img src={img} style={{ display: 'block', marginTop: '30px' }}/>
      </div>
    );
  }
}

export default App;
