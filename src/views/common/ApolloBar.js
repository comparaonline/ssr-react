import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Title } from './Layout';

const pokemonQuery = gql`
  query Pokemon($pokemon: String){
    pokemon(name: $pokemon) {
      id
      number
      name
      attacks {
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
        }
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

export default graphql(pokemonQuery, {
  options: {
    variables: {
      pokemon: 'Pikachu',
    },
  },
})(ApolloBar);
