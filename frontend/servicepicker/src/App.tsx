import React from 'react'
import './App.css'
import {
  createTheme,
  ThemeProvider,
  TypeBackground,
} from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import ServicesPage from './Components/Common/Big/ServicesPage'
import RegistrationPage from './Components/Common/Big/RegistrationPage'
import ServicePage from './Components/Common/Big/ServicePage'
import CssBaseline from '@mui/material/CssBaseline'

const innerTheme = createTheme({
  palette: {
    primary: {
      main: '#673AB7',
    },
    secondary: {
      main: '#FFF',
    },
    background: {
      default: '#edf2f2',
    },
  },
})

const App: React.FC = () => (
  <ThemeProvider theme={innerTheme}>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<ServicesPage />} />
      <Route path="/service/:serviceId" element={<ServicePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  </ThemeProvider>
)

export default App
