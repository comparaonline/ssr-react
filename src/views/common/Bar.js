import React, { Component } from 'react';
import { Title } from './Layout';

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
        <Title>Bar component loaded</Title>
        <span>this is an async component</span>
      </div>
    );
  }
}

export default Bar;
