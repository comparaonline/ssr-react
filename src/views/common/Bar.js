import React, { Component } from 'react';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Bar Component Mounted!');
  }

  render() {
    return (
      <div>
        <h2>Bar component loaded</h2>
        <span>this is an async component</span>
      </div>
    );
  }
}

export default Bar;
