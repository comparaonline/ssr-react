import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Title } from './Layout';

import { changeSSR } from 'Redux/actions';

import styles from './styles.css';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Bar Component Mounted!');
  }

  onClick = () => {
    this.props.changeSSR(!this.props.isSSR);
  }

  render() {
    return (
      <div className={styles.tanBG}>
        <Title>Bar component loaded</Title>
        <span>this is an async component</span>
        <div>isSSR: {this.props.isSSR.toString()}</div>
        <button onClick={this.onClick} className={styles.changeStateButton}>change state</button>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isSSR: state.isSSR,
});

export default connect(mapStateToProps, { changeSSR })(Bar);
