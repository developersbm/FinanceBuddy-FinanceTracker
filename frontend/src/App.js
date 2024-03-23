import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Dashboard from './screens/dashboard';
import Incomes from './screens/incomes';

function App() {
  return (
    <>
        <Router>
          <Navbar /> 
          <Routes>
            <Route exact path="./screens/dashboard" element={<Dashboard />} />
            <Route path="./screens/incomes" element={<Incomes />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
