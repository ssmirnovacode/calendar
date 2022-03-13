import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Calendar numberOfMonths={3} />
  </React.StrictMode>,
  document.getElementById('root')
);

