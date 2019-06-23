import React from 'react'
import { Table, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import {
  callApi
} from '../../service/callApi';
class PortfolioList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      portfolios:[],
      name:''
    };
this.searchPortfolio = this.searchPortfolio.bind(this);
}

componentDidMount(){
  this.getPortfolioList('');
}

  getPortfolioList(name){
    this.setState({isLoading:true});
  	callApi('portfolios', 'GET', {name}).then((result) => {
     const portfolios =result.data.Portfolios;
      this.setState({ portfolios,isLoading:false});
    })
  }

  searchPortfolio(event) {
    const name=event.target.value;
  this.setState({ name});
  this.getPortfolioList(name);
}




 render() {
 
return (
        <div className="portfolio-list">
        <Container>
        <Row>
        <Col>
        {this.state.isLoading && <span>Loading...</span>}
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
      <th>Number Of Holdings</th>
      <th>Last Modified</th>
    </tr>
  </thead>
  <tbody>
    
     {
              this.state.portfolios.map(row => <PortfolioRow row={row}  key={row._Id}/>)
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
      <td><Link to={"/transactions/"+row._Id}>{row.Name}</Link></td>
      <td className="text-right">{row.NumberOfHoldings}</td>
      <td>{row.LastModified}</td>
    </tr>)
}

export default PortfolioList; 