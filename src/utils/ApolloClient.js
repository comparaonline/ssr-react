import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

if (!global.fetch) {
  global.fetch = fetch;
}

export default new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:3000/marketplace/graphql',
  }),
  cache: new InMemoryCache(),
});

export const createApolloClient = (state) => (
  new ApolloClient({
    ssrMode: false,
    link: createHttpLink({
      uri: 'http://localhost:3000/marketplace/graphql',
    }),
    cache: new InMemoryCache().restore(state),
  })
);
