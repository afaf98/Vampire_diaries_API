import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1 className="text-align">The Vampire Diaries API</h1>
          <p className="text-align">Your favoirite seires in an API</p>
        </Container>
      </Jumbotron>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon3">
            https://vampire-diaries.herokuapp.com/
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          id="basic-url"
          aria-describedby="basic-addon3"
          placeholder="/seasons"
        />
      </InputGroup>
    </div>
  );
}
