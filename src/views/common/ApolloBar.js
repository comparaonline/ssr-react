import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Title } from './Layout';

const categoriesQuery = gql`
  query Categories($businessUnitInput: BusinessUnitInput) {
    categories(businessUnitInput: $businessUnitInput) {
      id
      code
      order
      url
      name
      with_redirect
      business_unit {
        category
        code
        logo
        name
        slug
      }
    }
  }
`;

class ApolloBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log(this.props); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <Title>Apollo Bar Component</Title>
      </div>
    );
  }
}

export default graphql(categoriesQuery, {
  options: {
    variables: {
      businessUnitInput: {
        country_code: 'cl',
        slug: 'seguro-obligatorio-soap',
      },
    },
  },
})(ApolloBar);
