import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { getEmployees } from "../actions/employeeActions";
import PropTypes from "prop-types";

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
        }
      }
    );

    if (!isCorrect) {
      alert("Incorrect email or password");
    }
  };

  return (
    <Container className="EmployeeLogin">
      <legend>Employee Login Page for Results</legend>
      <hr />
      <Form className="form" onSubmit={onSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="Email"
            id="email"
            placeholder="example@email.com"
            onChange={onChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="Passcode"
            id="password"
            placeholder="********"
            onChange={onChange}
          />
        </FormGroup>
        <Button className="btn" color="dark">
          Login
        </Button>
      </Form>
    </Container>
  );
};

EmployeeLogin.propTypes = {
  employee: PropTypes.object.isRequired,
  getEmployees: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default withRouter(
  connect(mapStateToProps, { getEmployees })(EmployeeLogin)
);
