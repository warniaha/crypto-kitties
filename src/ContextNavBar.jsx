import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

function ContextNavBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">ContextTest</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link href="/">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Test">
            <Nav.Link href="/Test">Test</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/About">
            <Nav.Link href="/About">About</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ContextNavBar;
