import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import EditPage from './components/EditPage';
import EditSebesPage from './components/EditSebesPage';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/sebes' element={<LoginPage onLogin={handleLogin}/>}/>
            <Route path='/sebes/' element={isAuthenticated ? <HomePage onLogout={handleLogout}/> : <LoginPage onLogin={handleLogin}/>}/>
            <Route path='/sebes/list' element={<EditPage onLogout={handleLogout}/>}/>
            <Route path='/sebes/:id/edit' element={<EditSebesPage/>}/>
          </Routes>
        </div>
      </Router> 
    </>
  );
}

export default App;
