import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { updateEmployee } from "../actions/employeeActions";
import PropTypes from "prop-types";

const EmployeeEditModal = (props) => {
  const employee = props.employee.employees.filter(
    (employee) => employee._id === props.id
  )[0];

  const [modal, setModal] = useState(false);
  const [employeeID, setEmployeeID] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLabWorker, setIsLabWorker] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (employee) {
      setEmployeeID(employee.employeeID);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setPasscode(employee.passcode);
      setIsLabWorker(employee.isLabWorker);
    }
  }, [employee]);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      _id: employee._id,
      employeeID: employeeID,
      email: email,
      firstName: firstName,
      lastName: lastName,
      passcode: passcode,
      isLabWorker: isLabWorker,
    };

    props.updateEmployee(updatedEmployee);
    toggle();
  };

  let checkboxHandler = (e) => {
    setIsLabWorker(!isLabWorker);
  };

  return (
    <div style={{ float: "right" }}>
      <Button
        className="edit-btn"
        color="dark"
        size="sm"
        style={{ marginBottom: "2rem" }}
        onClick={toggle}
      >
        Edit Employee
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit an Employee</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="FirstName"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={onChange}
              />
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="LastName"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={onChange}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="Email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
              />
              <Label for="firstName">Passcode</Label>
              <Input
                type="password"
                name="Passcode"
                id="passcode"
                placeholder="Passcode"
                value={passcode}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="IsLabWorker"
                  id="isLabWorker"
                  checked={isLabWorker ? "checked" : ""}
                  onChange={checkboxHandler}
                />{" "}
                Lab Worker
              </Label>
            </FormGroup>
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Update Employee
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

EmployeeEditModal.propTypes = {
  employee: PropTypes.object.isRequired,
  updateEmployee: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default connect(mapStateToProps, { updateEmployee })(EmployeeEditModal);
