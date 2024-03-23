import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import Dashboard from './dashboard';
import Incomes from './incomes';

const dashboard = () => {
    return (
        <>
        <Router>
          <Navbar /> 
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/incomes" element={<Incomes />} />
          </Routes>
        </Router>
        <h1>Hello</h1>
    </>
    );
};

export default dashboard;
