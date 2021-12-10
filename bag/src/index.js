import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './styles/styles.css'
import reportWebVitals from './reportWebVitals';
import {FirebaseContextProvider} from "./context/Firebase"

ReactDOM.render(
  <FirebaseContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
