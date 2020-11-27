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
import { updateEmployeeTest } from "../actions/employeeTestActions";

import PropTypes from "prop-types";

const EmployeeTestEditModal = (props) => {
  const employeeTest = props.employeeTest.employeeTests.filter(
    (employeeTest) => employeeTest._id === props.id
  )[0];

  const [modal, setModal] = useState(false);
  const [employeeID, setEmployeeID] = useState(0);
  const [testBarcode, setTestBarcode] = useState(0);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (employeeTest) {
      setEmployeeID(employeeTest.employeeID);
      setTestBarcode(employeeTest.testBarcode);
    }
  }, [employeeTest]);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    const updatedEmployeeTest = {
      _id: employeeTest._id,
      employeeID: employeeID,
      testBarcode: testBarcode,
    };

    props.updateEmployeeTest(updatedEmployeeTest);
    toggle();
  };

  // probably not needed
  //   let checkboxHandler = (e) => {
  //     setIsLabWorker(!isLabWorker);
  //   };

  return (
    <div style={{ float: "right" }}>
      <Button
        className="edit-btn"
        color="dark"
        size="sm"
        style={{ marginBottom: "2rem" }}
        onClick={toggle}
      >
        Edit EmployeeTest
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit an EmployeeTest</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="employeeID">Employee ID</Label>
              <Input
                type="text"
                name="EmployeeID"
                id="employeeID"
                placeholder="Employee ID"
                value={employeeID}
                onChange={onChange}
              />
              <Label for="testBarcode">Test Barcode</Label>
              <Input
                type="text"
                name="TestBarcode"
                id="testBarcode"
                placeholder="Test Barcode"
                value={testBarcode}
                onChange={onChange}
              />
            </FormGroup>
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Update EmployeeTest
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

EmployeeTestEditModal.propTypes = {};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, { updateEmployeeTest })(
  EmployeeTestEditModal
);
