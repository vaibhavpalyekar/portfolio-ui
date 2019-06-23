import React from 'react'
import {Navbar} from 'react-bootstrap';

class Header extends React.Component {
 

  render() {
  	return(
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">
      Portfolio Manager
    </Navbar.Brand>
  </Navbar>
  )
  }
}


export default Header;