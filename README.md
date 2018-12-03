### Table of contents

- [Description](#description)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Setup](#setup)
- [Available Commands](#available-commands)
- [Notes](#notes)
- [Next Steps](#next-steps)




# Description
SSR-React it's a React boilerplate project that supports SSR, CodeSplitting, GraphQL and other features by default. It's based on react-universal-component from [faceyspacey](https://github.com/faceyspacey/react-universal-component)

# Features
React-SSR supports the follow features:
- ES6
- Server Side Rendering (SSR)
- Client Side Rendering, client rehydratation (CSR)
- Hot Module Replacement (HMR)
- Redux
- GraphQL (with Apollo)
- Async Components (with react universal components)
- Async CSS (with react universal components)
- Testing environment (with Jest)
- i18n (with i18next)
- Javascript bundle splitting
- CSS splitting
- Environment Config
- Multiple Layouts Support (useful when you need render versions for AMP, desktop, mobile, etc.)
- Javascript Linter (with Airbnb config)
- Alias for common paths

# Folder Structure

```
ssr-react
├───__tests__           (contains all files related to tests)
│   ├───config          (config required for Jest before starts testing)
│   ├───e2e             (end to end tests)
│   ├───integration     (integration tests)
│   ├───unit            (unit tests)
│   └───utils           (tools or functions to reuse in tests)
├───assets              (contains all assets files)
│   ├───css             (contains css files)
│   ├───fonts           (contains fonts files)
│   └───img             (contains image files)
├───config              (contains config files related to the application/environment)
├───dist                (contains the bundled application for production)
├───src                 (contains application logic)
│   ├───client          (files related for client rendering and reydratation)
│   ├───i18n            (translation files)
│   ├───layouts         (contains layouts files)
│   ├───redux           (reducers and actions for redux)
│   ├───server          (server setup files)
│   ├───utils           (setup files for Apollo, I18n, etc.)
│   └───views           (contains all View Logic and React components)
│       ├───AMP         (components related to AMP)
│       ├───common      (cross components)
│       ├───desktop     (components for desktop version)
│       └───mobile      (components for mobile version)
└───webpack             (contains all webpack config for server and client)
    ├───client          (config related to client)
    ├───parts           (cross webpack configs)
    └───server          (config related to server)
```

# Installation
Follow the next steps to install `ssr-react` on your machine:

```bash
  # clone the repo
  git clone https://github.com/comparaonline/ssr-react.git

  # install dependencies
  cd ssr-react
  npm install

  # run application
  npm run start:dev
```

# Setup
You can customize application config inside `config` directory. `default.json` contains cross config for all environments. PORT application and others could be changed here.

# Available Commands
- `test:jest` : run all jest tests
- `test:jest:update` : update jest snapshots
- `lint:js` : run linter for files inside `src` directory
- `clean` : delete `dist` directory
- `build:client:dev` : build client bundles for development env
- `build:client:prod` : build client bundles for production env
- `build:server:dev` : build server bundle for development env
- `build:server:prod` : build server bundle for production env
- `start:spa:server` : serve `dist` files for CSR only
- `start:dev` : build client and server for development env and starts server
- `start:prod` : build client and server for production env and starts server

# Notes
- ssr-react uses `rim-raf` for cross env delete files
- ssr-react uses `cross-env` to define env variables

# Next Steps
- Add support for client build only, replacing `rehydrate` by `render`
