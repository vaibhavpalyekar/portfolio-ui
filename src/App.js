import React from 'react';
import './App.css';
import Header from './components/layout/Header.js'
import PortfolioList from './components/portfolio/PortfolioList.js'

function App() {
  return (
    <div className="App">
    <Header />
    <PortfolioList />
    </div>
  );
}

export default App;
