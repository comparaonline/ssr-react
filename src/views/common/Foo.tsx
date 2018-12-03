import React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';

class Foo extends React.Component<WithNamespaces> {
  constructor(props: WithNamespaces) {
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


export default withNamespaces()(Foo);
