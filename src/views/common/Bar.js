import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSSR } from 'Redux/actions';

import { Title } from './Layout';

import styles from './styles.css';

export class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Bar Component Mounted!'); // eslint-disable-line
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

Bar.propTypes = {
  isSSR: PropTypes.bool.isRequired,
  changeSSR: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isSSR: state.isSSR,
});

export default connect(mapStateToProps, { changeSSR })(Bar);
