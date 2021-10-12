import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function ContextNavBar() {
  return (
      <Navbar bg="primary" variant="dark">
      <Container>
      <Navbar.Brand href="#home">ContextTest</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Index</Nav.Link>
        <Nav.Link href="/Test">Test</Nav.Link>
        <Nav.Link href="/About">About</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  );
}

export default ContextNavBar;
