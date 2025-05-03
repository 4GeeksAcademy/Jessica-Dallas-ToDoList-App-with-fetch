import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home.jsx';
import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
