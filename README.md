# WebScrapper

An application to list all available hyperlinks in a web page from a given URL.

The repo structure has been created out of Amit's public React template. Links are given below.

[Amit's React-csr-template Github page](https://amit040386.github.io/react-csr-template/)

Icon set: [Material icon](https://material.io/resources/icons/?icon=search&style=baseline)

## Primary Tech stack

- **React**: The primary UI library
- **Redux**: Redux data flow
- **Redis**: Redis in-memory data store
- **React-redux**: Integrating React with Redux data flow
- **Redux-thunk**: Redux middleware to support asynchronous operations
- **Redux-persist**: Persist and rehydrate a redux store.
- **Redux-pack**: Redux library to extend various stages (start, success, error, finish, always) of API calling
- **React-loadable**: Code splitting
- **React-router-dom**: SPA routing
- **SASS**: CSS pre-processor
- **Axios**: Javascript library to make rest API call
- **React-helmet**: React library to change header metadata and title
- **Node-sass**: SASS CSS pre-processor
- **Jest**: Testing framework and test runner for unit test cases
- **Enzyme**: React component testing utility
- **Webpack**: Webpack module bundler

## Features of this template

- Complete UI architecture
- Centralised HTTP(S) request and response interceptor
- Progressive web app (PWA)
- Webpack based module bundler
- Internationalization or localization support with English and German language
- Used React context to implement Internationalization
- Offline support with service worker
- Code splitting with react-loadable
- Redux data flow
- React hooks
- Hot module reloading (HMR) for local development
- React memo to stop redundant rendition
- Error boundary to catch unexpected UI errors
- Modular and functional programming paradigm used
- Common and extensible config
- EsLint for maintaining uniform coding standards
- CSS pre-processor
- Centralised color variables
- Test case setup with Jest
- Redux extension for better local debugging
- Editor config for maintaining the similar coding indentation even if various editors are used across the team

## Quick start: How to run this template

First clone project and install dependencies

```sh
$ mkdir ProjectName && cd ProjectName
$ git clone https://github.com/amit040386/react-csr-template [YOUR APP NAME]
$ cd [YOUR APP NAME]
$ npm install
```

Then install Redis in local if not installed

```sh
$ sudo brew install redis
$ sudo brew services start redis (It should display: Successfully started redis)
$ redis-server (Command to check whether redis server is running or not)
```

Then run local

```sh
$ npm run start
```

Default port number is 7009

**NOTE**: To change the port, create a .env in root folder and add your port number as follows.

```javascript
PORT=4566
```

or change the port number in this file: server/util/port.js

**NOTE**: If any new locale texts are added, please re-execute the npm start command

## Unit Testing

Use the following commands to execute the test cases

```sh
$ npm run test
```

## License

This project is licensed under the MIT license, Copyright (c) 2019 Amit Pal. For more information see LICENSE.md.
