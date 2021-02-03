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
import Spinner from "react-bootstrap/Spinner";
import "./HomePage.scss";
import Search from "../../services/fecthing";
import requestApiKey from "../../services/requestApiKey";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function HomePage() {
  const [url, setUrl] = useState("seasons");
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
    if (!response.succes) {
      setKeyRequestedStatus("failed");
    } else {
      setKeyRequestedStatus("success");
    }
    console.log("Response", response);
  };
  console.log("Status", keyRequestedStatus);
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
    </div>
  );
}
