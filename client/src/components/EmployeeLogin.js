import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

class EmployeeLogin extends Component {
  render() {
    return (
      <Container className="EmployeeLogin">
        <h2>Employee Login Page for Results </h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email:</Label>
              <Input
                type="text"
                name="email"
                id="exampleEmail"
                placeholder="example@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password:</Label>
              <Input
                type="text"
                name="password"
                id="examplePassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button color="primary">Login</Button>
        </Form>
      </Container>
    );
  }
}

export default EmployeeLogin;