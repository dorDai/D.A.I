import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadAndRender() {
  const path = (window.location.pathname || '').replace(/\/+$/,'');
  let mod;
  try {
    if (path === '/wedding' || path.startsWith('/wedding/')) {
      mod = await import('./App_wedding.jsx');
    } else if (path === '/bm1213' || path.startsWith('/bm1213/')) {
      mod = await import('./App_1213.jsx');
    } else {
      mod = await import('./App.jsx');
    }
  } catch (e) {
    // Fallback to main app on error
    // eslint-disable-next-line no-console
    console.error('Failed to load page-specific bundle, falling back to main App', e);
    mod = await import('./App.jsx');
  }

  const AppComp = mod.default;
  root.render(
    <React.StrictMode>
      <AppComp />
    </React.StrictMode>
  );
}

loadAndRender();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
