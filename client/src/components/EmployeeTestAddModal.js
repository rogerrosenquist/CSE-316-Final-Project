import React, { useState, useEffect } from "react";
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
import { getEmployees } from "../actions/employeeActions";
import {
  getEmployeeTests,
  addEmployeeTest,
} from "../actions/employeeTestActions";
import PropTypes from "prop-types";

const EmployeeTestAddModal = (props) => {
  // debug output
  // console.log(props);

  const { employees } = props.employee;
  const { employeeTests } = props.employeeTest;

  const [modal, setModal] = useState(false);
  const [employeeID, setEmployeeID] = useState(0);
  const [testBarcode, setTestBarcode] = useState(0);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    props.getEmployees();
  }, []);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    // sake of using it
    // setEmployeeID(employeeID);
    // setTestBarcode(testBarcode);

    // integrity check: does employee exist
    let exist = props.doesEmployeeExist(employees, employeeID);
    if (!exist) {
      alert("Employee does not exist! Please input a valid Employee ID.");
      return;
    }

    // integrity check: is newly input testbarcode unique
    let unique = props.isTestBarcodeUnique(employeeTests, testBarcode);
    if (!unique) {
      alert("Test barcode is not unique! Please input a unique test barcode.");
      return;
    }

    const newEmployeeTest = {
      employeeID: employeeID,
      testBarcode: testBarcode,
    };

    // debug output
    // console.log("Added new employee test: ", newEmployeeTest);

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

EmployeeTestAddModal.propTypes = {
  employee: PropTypes.object.isRequired,
  getEmployees: PropTypes.func.isRequired,
  employeeTest: PropTypes.object.isRequired,
  getEmployeeTests: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, {
  getEmployees,
  getEmployeeTests,
  addEmployeeTest,
})(EmployeeTestAddModal);
