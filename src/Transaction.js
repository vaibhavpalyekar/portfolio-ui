import React from 'react';
import './App.css';
import Header from './components/layout/Header.js'
import TranscationList from './components/transaction/TransactionList.js'

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    console.log('props',props.match.params.portfolioId);
    this.state = {
      portfolioId:props.match.params.portfolioId
    };
}	

 render() {
  return (
    <div className="App">
    <Header />
    <TranscationList portfolioId={this.state.portfolioId} />
    </div>
  );
}
}

export default Transaction;
