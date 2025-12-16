import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from "react-hot-toast";
import axios from "axios";

const isProd = import.meta.env.PROD;

axios.defaults.baseURL = isProd
  ? import.meta.env.VITE_API_URL
  : "http://localhost:5000";

axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: { 
    fontFamily: "Roboto Slab, serif", 
    allVariants: { color: "white" },
  }
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
