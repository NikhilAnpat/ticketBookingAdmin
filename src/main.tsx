
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={"52526433407-sjeutjb4gbkvcd340l70pfhupgeuestg.apps.googleusercontent.com"}>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
