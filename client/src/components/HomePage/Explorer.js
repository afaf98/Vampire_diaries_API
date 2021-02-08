import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Search from "../../services/fecthing";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function Explorer() {
  const [json, setJson] = useState();
  const [url, setUrl] = useState(BASE_URL + `/api`);
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [query, setQuery] = useState("");
  const [route, setRoute] = useState("");
  function handleApiKeyInput(e) {
    setApiKey(e.target.value);
    localStorage.setItem("apiKey", e.target.value);
  }

  async function searchUrl(route, apiKey, query) {
    const newUrl = `${BASE_URL}/api${route}?key=${apiKey}${query}`;
    setUrl(newUrl);
    const response = await Search(newUrl);
    setJson(JSON.stringify(response, null, 4));

    //534d9e33-f4df-4e3c-af0c-f3ec8abccc36
  }
  return (
    <div>
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3" className="url-inputField">
            {url}
          </InputGroup.Text>
          <Button
            onClick={() => {
              searchUrl(route, apiKey, query);
            }}
          >
            Explore!
          </Button>
        </InputGroup>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Your Key :
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Insert your key here!"
              value={apiKey}
              onChange={handleApiKeyInput}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Route :
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Insert your key here!"
              value={route}
              onChange={(e) => {
                setRoute(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Query :
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="/seasons"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col>
            <Container className="pre-container">
              <Form.Label column sm="2">
                Data :
              </Form.Label>
              <Form.Control
                as="textarea"
                className="textareaExample data-displayed"
                rows={16}
                value={json}
                readOnly
              ></Form.Control>
            </Container>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
