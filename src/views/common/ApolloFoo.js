import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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

class ApolloFoo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log(this.props); //eslint-disable-line
  }

  render() {
    return (
      <div>
        <h2>Apollo Foo Component</h2>
      </div>
    );
  }
}

export default graphql(categoriesQuery, {
  options: {
    variables: {
      businessUnitInput: {
        country_code: 'cl',
        slug: 'afp',
      },
    },
  },
})(ApolloFoo);
