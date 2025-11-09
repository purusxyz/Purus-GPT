import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from "react-hot-toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "https://purus-gpt-backend.vercel.app";
axios.defaults.baseURL = API_URL;
// axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true; // Enable sending cookies with requests

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
