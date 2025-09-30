import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home'
import Navbar from './components/Navbar'
import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Stats from "./pages/Statistics";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  const {user} = useAuthContext()
  return (
    <DarkModeProvider>

      <div className="App">

      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/stats'
              element= {user ? <Stats/> : <Navigate to='/login' replace/>}
              />
            <Route
              path='/'
              element={user ? <Home/> : <Navigate to='/login' replace/>}
            />
            <Route
              path='/login'
              element={!user ? <Login/> : <Navigate to='/' replace/>}
              />
            <Route
              path='/signup'
              element={ !user ? <Signup/> : <Navigate to='/' replace/>}
              />
          </Routes>
        </div>
      </BrowserRouter>

      </div>
    </DarkModeProvider>
  );
}

export default App;
