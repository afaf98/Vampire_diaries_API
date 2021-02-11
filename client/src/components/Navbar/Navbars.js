import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navbars.scss";
import { BsBullseye } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Navbars() {
  return (
    <Navbar
      expand="md"
      variant="dark"
      bg="dark"
      fixed="top"
      className="mr-auto"
    >
      <Navbar.Brand>
        <BsBullseye />
      </Navbar.Brand>
      <Nav.Link as={Link} className="text-white" to="/">
        Home
      </Nav.Link>
      <Nav.Link as={Link} className="text-white" to="/documentation">
        Documentation
      </Nav.Link>
      <Nav.Link as={Link} className="text-white" to="/about">
        About
      </Nav.Link>
    </Navbar>
  );
}
