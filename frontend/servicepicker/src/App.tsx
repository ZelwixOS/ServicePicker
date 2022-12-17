import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import ServicesPage from './Components/Common/Big/ServicesPage';

const innerTheme = createTheme({
  palette: {
    primary: {
      main: '#673AB7',
    },
    secondary: {
      main: '#FFF',
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={innerTheme}>
    <Routes>
      <Route path="/" element={<ServicesPage />} />
    </Routes>
  </ThemeProvider>
);

export default App;
