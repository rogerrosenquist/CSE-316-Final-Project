import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Row,
} from 'reactstrap';


class Login extends Component {
  render() {
    return (
      <Container className="Login">
        <h2>Login Page</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="example@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Row xs="6">
            <Col>
                <Button color="primary">Login Collector</Button>
            </Col>
            <Col>
                <Button color="primary">Lab Login</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default Login;