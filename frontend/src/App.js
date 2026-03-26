import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './screens/dashboard';
import Incomes from './screens/incomes';
import Expenses from './screens/expenses';
import StockPredictor from './screens/stockPredictor';
import { useGlobalContext } from './context/globalContext';
// import StockPredictionApp from '../../screens/stockPredictor';

function App() {

  useGlobalContext();

  return (
    <Router>
        <div className="min-h-screen bg-base-100 text-base-content">
          <Navbar />
          <main className="mx-auto w-full max-w-7xl px-6 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/screens/dashboard" replace />} />
              <Route path="/screens/dashboard" element={<Dashboard />} />
              <Route path="/screens/incomes" element={<Incomes />} />
              <Route path="/screens/expenses" element={<Expenses />} />
              <Route path="/screens/stocks" element={<StockPredictor />} />
            </Routes>
          </main>
        </div>
          {/* <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          /> */}
    </Router>
  );
}

export default App;