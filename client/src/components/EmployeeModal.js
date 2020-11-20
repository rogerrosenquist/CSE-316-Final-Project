/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import React, { Component, useState } from "react";
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
import { v4 as uuid } from "uuid";
import axios from "axios";

const EmployeeModal = (props) => {
  const [modal, setModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const toggle = () => setModal(!modal);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      employeeID: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      email: "default",
      firstName: firstName,
      lastName: "default",
      passcode: "default",
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
