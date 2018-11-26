import React, { Component } from 'react';
import { translate } from 'react-i18next';

interface IProps {
  t: (param: string) => string;
};

class Foo extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Foo Component Mounted!'); // eslint-disable-line
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <h2>Foo component loaded</h2>
        <span>this is an async component</span>
        <p>{ t('text') }</p>
      </div>
    );
  }
}


export default translate()(Foo);
