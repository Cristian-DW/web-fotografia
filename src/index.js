import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Main entry point of the application
 * 
 * This file is the main entry point of the React application. It renders the root component
 * (`App`) into the DOM element with the ID `root`. It also sets up performance measurement 
 * using `reportWebVitals`.
 */

// Create a root DOM node for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component within React's StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Start measuring performance in the app
reportWebVitals();
