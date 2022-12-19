import React from 'react'
import './App.css'
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles'
import { Route, Routes } from 'react-router-dom'
import ServicesPage from './Components/Common/Big/ServicesPage'
import RegistrationPage from './Components/Common/Big/RegistrationPage'
import ServicePage from './Components/Common/Big/ServicePage'
import CssBaseline from '@mui/material/CssBaseline'
import CategoriesPage from './Components/Common/Big/CategoriesPage'
import CategoryPage from './Components/Common/Big/CategoryPage'
import { AdminPage } from './Components/Administrator/Big/AdminPage'
import { CategoryList } from './Components/Administrator/Big/CategoryList'
import { ClientsList } from './Components/Administrator/Big/ClientsList'
import { ServiceList } from './Components/Administrator/Big/ServiceList'

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
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/categories" element={<CategoryList />} />
      <Route path="/admin/clients" element={<ClientsList />} />
      <Route path="/admin/services" element={<ServiceList />} />
    </Routes>
  </ThemeProvider>
)

export default App
