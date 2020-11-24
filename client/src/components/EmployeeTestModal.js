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
import { addEmployeeTest } from "../actions/employeeTestActions";

const EmployeeTestModal = (props) => {
  const [modal, setModal] = useState(false);
  const [employeeID, setEmployeeID] = useState(0);
  const [testBarcode, setTestBarcode] = useState(0);
  const toggle = () => setModal(!modal);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    const newEmployeeTest = {
      employeeID: employeeID,
      testBarcode: testBarcode,
    };
    console.log(newEmployeeTest);
    props.addEmployeeTest(newEmployeeTest);
    toggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add EmployeeTest
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add an EmployeeTest</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="employeeID">Employee ID</Label>
              <Input
                type="text"
                name="EmployeeID"
                id="employeeID"
                placeholder="Employee ID"
                onChange={onChange}
              />
              <Label for="testBarcode">Test Barcode</Label>
              <Input
                type="text"
                name="TestBarcode"
                id="testBarcode"
                placeholder="Test Barcode"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add EmployeeTest
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, { addEmployeeTest })(EmployeeTestModal);
