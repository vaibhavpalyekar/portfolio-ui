import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  callApi
} from '../../service/callApi';
class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioList:[],
      name:'',
      portfolioId:'',
      startDate: new Date(),
      portfolioTotalValue:0,
      selectedRow : '',
      expandedRows :[]
    };
this.handleChange = this.handleChange.bind(this);
}

componentDidMount(){
  console.log(this.props);
  const { portfolioId } = this.props;
   this.setState({portfolioId});
  this.getTransactions(portfolioId);
}

  getTransactions(portfolioId,date){
    const data={};
    if(date){
    data.date=moment(date).format('YYYY-MM-DD');
     }
    callApi('transactions/'+portfolioId, 'GET',data).then((result) => {
     let name='',portfolioTotalValue=0,portfolioList=[];
     if(result.data && result.data.Portfolio){
     const portfolio =result.data.Portfolio;
     name=portfolio.Name;
     portfolioList=portfolio.PortfolioList;
     portfolioTotalValue=portfolio.PortfolioTotalValue
     } 
      this.setState({ name,portfolioList,portfolioTotalValue});
    })
  }

handleChange(date) {
    this.setState({
      startDate: date
    });
  this.getTransactions(this.state.portfolioId,date);
  
  }

  handleRowClick(securityId,transactions) {
    console.log("securityId",securityId);
        this.setState({selectedRow : securityId,expandedRows:transactions});
    }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.SecurityId,item.Transactions);

        const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item.SecurityId}>
          <td>{item.Name}</td>
      <td>{item.Date}</td>
      <td className="text-right">{parseFloat(item.Shares).toFixed(2)}</td>
      <td className="text-right">{parseFloat(item.Price).toFixed(2)}</td>
      <td className="text-right">{parseFloat(item.Amount).toFixed(2)}</td>     
      </tr>
        ];
        
        if(this.state.selectedRow===item.SecurityId) {

            this.state.expandedRows.map(trx=>{
            itemRows.push(
                <tr className="table-secondary" key={"row-expanded-" + trx.Date}>
                    <td>{trx.Type}</td>
                    <td>{trx.Date}</td>
      <td className="text-right">{parseFloat(trx.Shares).toFixed(2)}</td>
      <td className="text-right">{parseFloat(trx.Price).toFixed(2)}</td>
      <td className="text-right">{parseFloat(trx.Amount).toFixed(2)}</td>     
      
                </tr>
            );
            return true;
            })
        }
        
        return itemRows;    
    }




 render() {
  let rows = [];
        
        this.state.portfolioList.forEach(item => {
            const perItemRows = this.renderItem(item);
            rows = rows.concat(perItemRows);
        });
 
return (
        <Container>
        <Row>
        <Col className="m-1">
        {this.state.name && <strong>Transactions of {this.state.name}</strong>}
        </Col>
        <Col className="m-1">
        <div className="float-right">
        <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={this.state.startDate}
        onChange={this.handleChange}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      </div>
       </Col>
       </Row>
       <Row>
        <Table bordered hover variant="dark" responsive>
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
    
     {rows}
  </tbody>
  <tfoot>
  <tr>
  <td colSpan="4">
  Total Portfolio Value
  </td>
  <td className="text-right">
  {parseFloat(this.state.portfolioTotalValue).toFixed(2)}
  </td>
  </tr>
  </tfoot>
</Table>
</Row>
</Container>
)
}

}


export default TransactionList; 