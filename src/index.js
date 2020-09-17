import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import rootReducer from './store/reducers/rootReducer'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import firebase from "./config/fbConfig"

import 'firebase/firestore'

const rrfConfig = { 
  userProfile: 'projects',
  useFirestoreForProfile: true
}

const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      reduxFirestore(firebase)
  ));

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
  }

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <Router>
      <App />
    </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
