import React from 'react'
import { Table, Form, FormControl, Container, Row, Col } from 'react-bootstrap';

import {
  callApi
} from '../../service/callApi';
class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions:[],
      name:'',
      portfolioId:''
    };
this.searchTranscation = this.searchTranscation.bind(this);
}

componentDidMount(){
  console.log(this.props);
  const { portfolioId } = this.props;

  this.getTransactions(portfolioId);
}

  getTransactions(portfolioId){
    callApi('transactions/'+portfolioId, 'GET',{}).then((result) => {
     let name='',transactions=[];
     if(result.data && result.data.Portfolio){
     const portfolio =result.data.Portfolio;
     name=portfolio.Name;
     transactions=portfolio.Transactions;
     } 
      this.setState({ name,transactions});
    })
  }

  searchTranscation(event) {
    const name=event.target.value;
  this.setState({ name});
  this.getTransactions(name);
}




 render() {
 
return (
        <div className="portfolio-list">
        <Container>
        <Row>
        <Col>
        {this.state.name && <strong>Transactions of {this.state.name}</strong>}
        </Col>
        <Col >
        <Form inline className="float-right">
       <FormControl type="text" placeholder="Search" className="mr-sm-2 m-1" onChange={this.searchPortfolio} />
       </Form>
       </Col>
       </Row>
       <Row>
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Name</th>
      <th>Date</th>
      <th>Shares</th>
      <th>Price</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    
     {
              this.state.transactions.map(row => <PortfolioRow row={row}  key={row._Id}/>)
     }
  </tbody>
</Table>
</Row>
</Container>
      </div>
)
}

}

const PortfolioRow = ({row})=>{
return (<tr>
      <td>{row.Name}</td>
      <td>{row.Date}</td>
      <td className="text-right">{row.Shares}</td>
      <td className="text-right">{row.Price}</td>
      <td className="text-right">{row.Amount}</td>
    </tr>)
}

export default TransactionList; 