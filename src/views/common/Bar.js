import React, { Component } from 'react';
import { Title } from './Layout';

import styles from './styles.css';

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
      <div className={styles.tanBG}>
        <Title>Bar component loaded</Title>
        <span>this is an async component</span>
      </div>
    );
  }
}

export default Bar;
