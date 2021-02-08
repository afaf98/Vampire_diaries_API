import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";

import InputGroup from "react-bootstrap/InputGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./HomePage.scss";
import Search from "../../services/fecthing";
import requestApiKey from "../../services/requestApiKey";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const BASE_URL = process.env.REACT_APP_API_URL;

export default function HomePage() {
  const [json, setJson] = useState();
  const [url, setUrl] = useState(BASE_URL + `/api`);
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"));
  const [query, setQuery] = useState("");
  const [route, setRoute] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [keyRequestedStatus, setKeyRequestedStatus] = useState("idle");
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  //idle
  //Submit -> processing (hide/disable button)
  //success -> Show Check your email
  //failed -> Ops something went wrong!/Already have a key

  const onSubmit = async (email) => {
    setKeyRequestedStatus("processing");
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const response = await requestApiKey(email);
    if (!response.success) {
      setKeyRequestedStatus("failed");
      setResStatus(response.message);
    } else {
      setKeyRequestedStatus("success");
      setResStatus(response.message);
    }
    console.log("Response", response);
  };
  console.log("Check apikey request", keyRequestedStatus);
  function handleApiKeyInput(e) {
    setApiKey(e.target.value);
    localStorage.setItem("apiKey", e.target.value);
  }

  async function SearchUrl(route, apiKey, query) {
    console.log("The URL", `${BASE_URL}/api/${route}?key=${apiKey}${query}`);
    const newUrl = `${BASE_URL}/api${route}?key=${apiKey}${query}`;
    setUrl(newUrl);
    const response = await Search(newUrl);
    setJson(JSON.stringify(response, null, 4));

    //534d9e33-f4df-4e3c-af0c-f3ec8abccc36
  }
  console.log("Response", json);

  return (
    <div>
      <Jumbotron fluid>
        <Container className="rounded-2">
          <h1 className="text-align">The Vampire Diaries API</h1>
          <p className="text-align">Your favorite series in an API</p>
        </Container>
      </Jumbotron>
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3" className="url-inputField">
            {url}
          </InputGroup.Text>
          <Button
            onClick={() => {
              SearchUrl(route, apiKey, query);
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

      <Container
        className={
          keyRequestedStatus === "success" || keyRequestedStatus === "failed"
            ? "display-none"
            : "apikey-container"
        }
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          validated={false}
          className="apikey-form"
        >
          <Form.Group controlId="formGroupEmail">
            <Form.Label>
              <h2>Get your FREE Api key here!</h2>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              ref={register}
              className={errors.email ? "is-invalid" : ""}
            />
            <Form.Control.Feedback type="invalid">
              <ErrorMessage errors={errors} name="email" />
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={keyRequestedStatus === "processing"}
          >
            {keyRequestedStatus === "processing" ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </Container>
      <Card
        className={
          keyRequestedStatus === "success" || keyRequestedStatus === "failed"
            ? "visible apikey-response-success"
            : "invisible"
        }
      >
        <Card.Header
          as="h5"
          className={
            keyRequestedStatus === "success"
              ? "header-success"
              : "header-failed"
          }
        >
          {keyRequestedStatus === "success" ? "Success" : "Failed"}
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>Check your email!</Card.Title> */}
          <Card.Text>{resStatus}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
