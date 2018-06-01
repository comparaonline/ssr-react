import React, { Component } from 'react';

class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Foo Component Mounted!');
  }

  render() {
    return (
      <div>
        <h2>Foo component loaded</h2>
        <span>this is an async component</span>
      </div>
    );
  }
}

export default Foo;
