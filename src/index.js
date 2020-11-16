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
import { useSelector  } from 'react-redux'
import { isLoaded  } from 'react-redux-firebase';

import 'firebase/firestore'

const rrfConfig = { 
  userProfile: 'users', // TODO
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

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
        return children
}

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <AuthIsLoaded>
    <Router>
      <App />
    </Router>
    </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
