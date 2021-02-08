import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

import requestApiKey from "../../services/requestApiKey";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function ApiKeyForm() {
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
    const response = await requestApiKey(email);
    if (!response.success) {
      setKeyRequestedStatus("failed");
      setResStatus(response.message);
    } else {
      setKeyRequestedStatus("success");
      setResStatus(response.message);
    }
  };
  return (
    <div>
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
