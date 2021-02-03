import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./HomePage.scss";
import Search from "../../services/fecthing";
import requestApiKey from "../../services/requestApiKey";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function HomePage() {
  const [url, setUrl] = useState("seasons");
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (email) => requestApiKey(email);

  useEffect(() => {
    Search(url);
  }, [url]);
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </InputGroup>
      <Container className="apikey-container">
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
