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
      <Toaster/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/signup' element={ loggedIn? <Dashboard/> : <SignupPage/> } />
        <Route path='/email-verification' element={ loggedIn? <Dashboard/> : <VerificationPage/> } />
        <Route path='/login' element={ loggedIn? <Dashboard/> : <LoginPage/> } />
        <Route path='/dashboard' element={ loggedIn? <Dashboard/> : <LoginPage/>} />
      </Routes>
    </>
  )
}

export default App;
