import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ScrollToTop />
    <AppContextProvider>
      <ToastContainer/>
        <App />
    </AppContextProvider>
  </BrowserRouter>,
)
