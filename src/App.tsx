import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import SignupPage from './Pages/SignupPage'
import VerificationPage from './Pages/VerificationPage'
import LoginPage from './Pages/LoginPage'
import Dashboard from './Pages/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/email-verification' element={<VerificationPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </>
  )
}

export default App
