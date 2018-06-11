import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { get } from 'Config';

if (!global.fetch) {
  global.fetch = fetch;
}

export const createApolloClientSSR = () => (
  new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: get('graphqlEndpoint'),
    }),
    cache: new InMemoryCache(),
  })
);

export const createApolloClient = state => (
  new ApolloClient({
    ssrMode: false,
    link: createHttpLink({
      uri: get('graphqlEndpoint'),
    }),
    cache: new InMemoryCache().restore(state),
  })
);
