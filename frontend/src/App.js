import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './screens/dashboard';
import Incomes from './screens/incomes';
import Expenses from './screens/expenses';
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
            <Route exact path="/screens/dashboard" element={<Dashboard />} />
            <Route path="/screens/incomes" element={<Incomes />} />
            <Route exact path="/screens/expenses" element={<Expenses />} />
          </Routes>
    </Router>
  );
}

export default App;