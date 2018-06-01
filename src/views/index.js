import React, { Component } from 'react';
import universal from 'react-universal-component';

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

      default:
        page = 'Bar';
        break;
    }

    this.state = { page };
  }

  onClick = () => {
    this.setState({
      page: this.state.page === 'Bar' ? 'Foo' : 'Bar',
    })
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        <h1>Universal Component</h1>
        <UniversalComponent page={page} />
        <button onClick={this.onClick}>Switch</button>
      </div>
    );
  }
}

export default App;
