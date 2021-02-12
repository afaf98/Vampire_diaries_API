import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./Header.scss";

export default function Header() {
  return (
    <div>
      <Jumbotron fluid>
        <Container className="rounded-2">
          <h1 className="text-align">The Vampire Diaries API</h1>
          <p className="text-align">Your favorite series in an API</p>
        </Container>
      </Jumbotron>
    </div>
  );
}
