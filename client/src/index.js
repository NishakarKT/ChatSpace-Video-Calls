import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import FirebaseContext from "./contexts/FirebaseContext";
import { firebase } from "./lib/Firebase";

render(
  <FirebaseContext.Provider value={{ firebase }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);