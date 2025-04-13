import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navigator() {
  return (
    <Navbar variant="dark" fixed="top" className="custom-navbar shadow">
      <Container>
        <Navbar.Brand className="navbar-brand">公正评价，共同成长</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={Link} to="/home">
            <i className="bi bi-house-door-fill"></i>
          </Nav.Link>
          <div className="line"></div>
          <i className="bi bi-translate custom-icon"></i>

          {/* <Nav.Link as={Link} to="/rating">
            评分
          </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
