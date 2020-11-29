import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { getEmployees } from "../actions/employeeActions";
import PropTypes from "prop-types";

const Login = (props) => {
  const history = useHistory();

  let { employees } = props.employee;

  const [employeeIDInput, setEmployeeID] = useState(0);
  const [passcodeInput, setPasscode] = useState("");

  // let resetInput = () => {
  //   setEmployeeID(0);
  //   setPasscode("");
  // };

  useEffect(() => {
    props.getEmployees();
  }, []);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    let isCorrect = false;
    console.log(employeeIDInput, passcodeInput);
    e.preventDefault();
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
        if (
          employeeIDInput == employeeID &&
          passcodeInput === passcode &&
          isLabWorker
        ) {
          isCorrect = true;
          console.log(employeeIDInput, passcodeInput, isLabWorker);
          history.push({
            pathname: "/LabHome",
            search: "",
            state: { currentEmployeeID: employeeID },
          });
        } else if (
          employeeIDInput == employeeID &&
          passcodeInput === passcode &&
          !isLabWorker
        ) {
          isCorrect = true;
          alert("Sorry, you're not a lab worker!");
        }
      }
    );

    if (!isCorrect) {
      alert("Incorrect labID or password");
    }
  };

  return (
    <Container className="Login">
      <legend>Login Page</legend>
      <hr />
      <Form className="form" onSubmit={onSubmit}>
        <FormGroup>
          <Label for="employeeID">Lab ID</Label>
          <Input
            type="text"
            name="EmployeeID"
            id="employeeID"
            placeholder="Lab ID"
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
          Lab Login
        </Button>
      </Form>
    </Container>
  );
};

Login.propTypes = {
  employee: PropTypes.object.isRequired,
  getEmployees: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default withRouter(connect(mapStateToProps, { getEmployees })(Login));
