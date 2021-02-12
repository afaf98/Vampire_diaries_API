import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import useSearch from "../../hooks/useSearch";
import useApiKey from "../../context/ApiKeyContext";

import "./HomePage.scss";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function Explorer() {
  const api = useApiKey();
  console.log("What is api", api);
  const [url, setUrl] = useState(BASE_URL + `/api`);
  const [query, setQuery] = useState("");
  const [route, setRoute] = useState("");

  const { statusCode, status, data } = useSearch({
    url,
  });

  function handleApiKeyInput(e) {
    api.setApiKey(e.target.value);
    localStorage.setItem("apiKey", e.target.value);
  }

  function updateUrl(route, apiKey, query) {
    const newUrl = `${BASE_URL}/api${route}?key=${apiKey}${query}`;
    setUrl(newUrl);
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
              updateUrl(route, api.apiKey, query);
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
              value={api.apiKey}
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
                <p className="bold">Data:</p>
                <h4
                  className={status === "Success" ? "color_green" : "color_red"}
                >
                  {status}
                </h4>
                <span className="bold">
                  Status Code:
                  <h4
                    className={statusCode === 200 ? "color_green" : "color_red"}
                  >
                    {statusCode}
                  </h4>
                </span>
              </Form.Label>
              <Form.Control
                as="textarea"
                className="textareaExample data-displayed"
                rows={16}
                value={JSON.stringify(data, null, 4)}
                readOnly
              ></Form.Control>
            </Container>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
