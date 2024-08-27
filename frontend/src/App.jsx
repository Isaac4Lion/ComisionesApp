import './App.css'
import AdminButtons from './pages/AdminButtons'
import Header from './components/Header'
import Table from './pages/Table'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import UserForm from './pages/UserForm'
import UsersTable from './pages/UsersTable'
import Condiciones from './pages/Condiciones'
import DesistLots from './pages/DesistLots'
import UpdateBDD from './pages/UpdateBDD'
import LoginForm from './pages/LoginForm'
import { AuthProvider } from './context/AuthProvider'
import NotFoundPage from './pages/404Page'
import ConfirmEmail from './pages/ConfirmEmail'
import Profile from './pages/Profile'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>

      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Table />} />
          <Route path='admin' element={<AdminButtons />} />
          <Route path='admin/crear-usuario' element={<UserForm />}/>
          <Route path='admin/usuarios' element={<UsersTable />} />
          <Route path='admin/condiciones' element={<Condiciones />}/>
          <Route path='admin/desistimientos' element={<DesistLots />} />
          <Route path='admin/actualizar-bdd' element={<UpdateBDD />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/confirmar-email/:token' element={<ConfirmEmail />}/>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
