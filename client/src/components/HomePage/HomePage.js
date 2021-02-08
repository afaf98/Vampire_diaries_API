import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

import "./HomePage.scss";
import Explorer from "./Explorer";
import ApiKeyForm from "./ApiKeyForm";

export default function HomePage() {
  return (
    <div>
      <Jumbotron fluid>
        <Container className="rounded-2">
          <h1 className="text-align">The Vampire Diaries API</h1>
          <p className="text-align">Your favorite series in an API</p>
        </Container>
      </Jumbotron>
      <Explorer />
      <ApiKeyForm />
    </div>
  );
}
