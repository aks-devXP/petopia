import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { LoadingProvider } from './Pages/LodingPage.jsx';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId='494362090516-r69v7vu4ar7hid9jrvngng3b2uajrt2v.apps.googleusercontent.com'>
    <LoadingProvider>
       <App />
    </LoadingProvider>
    </GoogleOAuthProvider>
     
)
