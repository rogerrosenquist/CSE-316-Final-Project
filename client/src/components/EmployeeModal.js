import React, { useState } from "react";
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
import { addEmployee } from "../actions/employeeActions";

const EmployeeModal = (props) => {
  const [modal, setModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const toggle = () => setModal(!modal);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      employeeID: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      email: email,
      firstName: firstName,
      lastName: lastName,
      passcode: passcode,
    };

    props.addEmployee(newEmployee);
    toggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Employee
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add an Employee</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="FirstName"
                id="firstName"
                placeholder="First Name"
                onChange={onChange}
              />
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="LastName"
                id="lastName"
                placeholder="Last Name"
                onChange={onChange}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="Email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="firstName">Passcode</Label>
              <Input
                type="password"
                name="Passcode"
                id="passcode"
                placeholder="Passcode"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Employee
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default connect(mapStateToProps, { addEmployee })(EmployeeModal);
