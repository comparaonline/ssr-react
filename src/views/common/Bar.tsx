import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSSR } from 'Redux/actions';
import { State } from 'Redux/reducers';

import { Title } from './Layout';

import * as styles from './styles.css';

interface IProps {
  isSSR: State['isSSR'];
  changeSSR: (ssr: boolean) => void;
};

export class Bar extends Component<IProps, {}> {
  constructor(props: IProps) {
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

const mapStateToProps = (state: State) => ({
  isSSR: state.isSSR,
});

export default connect(mapStateToProps, { changeSSR })(Bar);
