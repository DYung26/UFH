import React from 'react';
// import logo from './logo.svg';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Homepage';
// import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-grow p-4 ml-64">
	    <Routes>
	     <Route path="/UFH/" element={<HomePage />}/>
	     <Route path="/UFH/dashboard" element={<Dashboard />}/>
	    </Routes>
          </div>
         </div>
      </div>
    </Router>
  );
};

export default App;
