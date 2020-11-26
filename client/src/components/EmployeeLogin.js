import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Route, withRouter } from "react-router-dom";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEmployees } from "../actions/employeeActions";
import PropTypes from "prop-types";
import store from "../store";
import Results from "./Results";

const EmployeeLogin = (props) => {
  const [emailInput, setEmail] = useState("");
  const [passcodeInput, setPasscode] = useState("");

  let { employees } = props.employee;
  const history = useHistory();

  useEffect(() => {
    props.getEmployees();
  }, []);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    let isCorrect = false;
    e.preventDefault();
    console.log(emailInput, passcodeInput);
    employees.map(
      ({
        isLabWorker,
        _id,
        employeeID,
        email,
        firstName,
        lastName,
        passcode,
      }) => {
        if (emailInput === email && passcodeInput === passcode) {
          isCorrect = true;

          history.push({
            pathname: "/results",
            search: "",
            state: { currentEmployeeID: employeeID },
          });
          // return (
          // <Redirect
          //   to={{
          //     pathname: "/results",
          //     search: "",
          //     state: { currentEmployeeID: employeeID },
          //   }}
          // />;
          // );

          console.log(props);
          // return (
          // <Route
          //   render={({ location }) => (
          //     <Redirect
          //       to={{
          //         pathname: "/results",
          //         state: { currentEmployeeID: employeeID },
          //       }}
          //     />
          //   )}
          // />;
          // );

          // <Route
          //   exact
          //   path="/results"
          //   render={() =>
          //     true ? (
          //       <Redirect to="results" />
          //     ) : (
          //       <Results currentEmployeeID={employeeID} />
          //     )
          //   }
          // />;

          console.log("after redirect");
        }
      }
    );

    if (!isCorrect) {
      alert("Incorrect email or password");
    }
  };

  return (
    <Container className="EmployeeLogin">
      <h2>Employee Login Page for Results </h2>
      <Form className="form" onSubmit={onSubmit}>
        <Col>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              name="Email"
              id="exampleEmail"
              placeholder="example@email.com"
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password:</Label>
            <Input
              type="password"
              name="Passcode"
              id="examplePassword"
              placeholder="********"
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Button color="primary">Login</Button>
      </Form>
    </Container>
  );
};

EmployeeLogin.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default withRouter(
  connect(mapStateToProps, { getEmployees })(EmployeeLogin)
);
