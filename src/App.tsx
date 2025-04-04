import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import SignupPage from './Pages/SignupPage'
import VerificationPage from './Pages/VerificationPage'
import LoginPage from './Pages/LoginPage'
import Dashboard from './Pages/Dashboard'
import useGlobalState from './State'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import AdminDashboard from './Pages/AdminDashboard'

function App() {
  const { loggedIn, setLoggedIn } = useGlobalState();

  useEffect(()=>{
    const getUser = ()=>{
      const token = localStorage.getItem('evtolToken');
      if(token){
        setLoggedIn(true);
      }

    }
    getUser();
  },[])


  return (
    <>
      <Toaster richColors/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/signup' element={ <SignupPage/> } />
        <Route path='/email-verification' element={ loggedIn? <Dashboard/> : <VerificationPage/> } />
        <Route path='/login' element={ <LoginPage/> } />
        <Route path='/dashboard' element={ <Dashboard/> } />
        <Route path='/admin' element={ <AdminDashboard/> } />
      </Routes>
    </>
  )
}

export default App;
