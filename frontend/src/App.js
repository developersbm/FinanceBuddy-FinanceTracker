import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './dashboard';
import Incomes from './incomes';
import Expenses from './expenses';
import Home from './home';
import { GlobalStyle } from './styles/GlobalStyle';
import { useGlobalContext } from './context/globalContext';

function App() {

  const global = useGlobalContext()
  console.log(global)

  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route exact path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
}

export default App;