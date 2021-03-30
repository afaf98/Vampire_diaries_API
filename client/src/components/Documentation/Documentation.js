import React from "react";
import Header from "../Jumbotron/Header";
import Card from "react-bootstrap/Card";

export default function Documentation() {
  return (
    <div>
      <Header />
      <Card style={{ width: "50%", margin: "2rem auto" }}>
        <Card.Body>
          <Card.Title>Documentation</Card.Title>
          <Card.Text>
            You can find the Api Documentation in my Github Readme.
          </Card.Text>
          <Card.Link href="https://github.com/afaf98/Vampire_diaries_API#Api-Docs">
            Api Docs
          </Card.Link>
        </Card.Body>
      </Card>
      <Card style={{ width: "50%", margin: "2rem auto" }}>
        <Card.Body>
          <Card.Title>Bugs</Card.Title>
          <Card.Text>
            If you find a bug in the Api please let me know, you can make an
            issue in Github.
          </Card.Text>
          <Card.Link href="https://github.com/afaf98/Vampire_diaries_API/issues/new">
            Report a Bug or Make feature request
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
