import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import {
  Container,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { getEmployees } from "../actions/employeeActions";
import PropTypes from "prop-types";

const Login = (props) => {
  const [employeeIDInput, setEmployeeID] = useState(0);
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
      <h2>Login Page</h2>
      <Form className="form" onSubmit={onSubmit}>
        <Col>
          <FormGroup>
            <Label>Lab ID:</Label>
            <Input
              type="text"
              name="EmployeeID"
              id="exampleEmployeeID"
              placeholder="Lab ID"
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="Passcode"
              id="examplePassword"
              placeholder="********"
              onChange={onChange}
            />
          </FormGroup>
        </Col>
        <Button color="primary">Lab Login</Button>
      </Form>
    </Container>
  );
};

Login.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default withRouter(connect(mapStateToProps, { getEmployees })(Login));
