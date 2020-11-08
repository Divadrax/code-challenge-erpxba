# Code Challenge Solution
This is my solution to the Reckon code challenge.  It uses Mocha, Express and Axios, so an `npm install` is needed on installation.

To start the server:
```
npm start
```
The server listens on port 9999 by default.  This can be changed by setting the environment variable RECKONPORT to the desired port.

Unit tests can be run using npm:
```
npm test
```

The code includes a test server mocking the test API endpoints.  It is checked in with the examples from the test specification, but I played with variations during development.

## Test 1
The Test 1 solution can be run by hitting the root URI of the server: `http://localhost:<port>/`.

## Test 2
The Test 2 solution can be run by hitting the `test2` path: `http://localhost:<port>/test2`.
