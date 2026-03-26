import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from './context/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ThemeProvider>
  </React.StrictMode>
);

