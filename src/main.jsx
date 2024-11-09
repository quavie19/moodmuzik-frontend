import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/index.css';
import { PlaylistProvider } from './components/PlaylistContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PlaylistProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PlaylistProvider>
);
