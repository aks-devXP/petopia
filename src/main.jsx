import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoadingProvider } from './Pages/LodingPage.jsx'

createRoot(document.getElementById('root')).render(
    <LoadingProvider>
       <App />
    </LoadingProvider>
     
)
