import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Area51 from './Area51';
import reportWebVitals from './reportWebVitals';
//import FlagsiFuglur from './flagsifuglur';
import SuperDario from "./SuperDario";

ReactDOM.render(
  <React.StrictMode>
    <SuperDario />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
