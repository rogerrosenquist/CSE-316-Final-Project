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
import { getEmployees } from "../actions/employeeActions";
import {
  getEmployeeTests,
  updateEmployeeTest,
} from "../actions/employeeTestActions";
import PropTypes from "prop-types";

let isTestBarcodeSameAsBefore = (employeeTest, testBarcode) => {
  if (employeeTest.testBarcode == testBarcode) {
    return true;
  }
  return false;
};

const EmployeeTestEditModal = (props) => {
  // debug output
  console.log(props);

  const { employees } = props.employee;
  const { employeeTests } = props.employeeTest;

  const employeeTest = employeeTests.filter(
    (employeeTest) => employeeTest._id === props._id
  )[0];

  const [modal, setModal] = useState(false);
  const [employeeID, setEmployeeID] = useState(0);
  const [testBarcode, setTestBarcode] = useState(0);
  const toggle = () => {
    setModal(!modal);
    resetModalInput();
  };

  useEffect(() => {
    props.getEmployees();
  }, []);

  useEffect(() => {
    if (employeeTest) {
      resetModalInput();
    }
  }, [employeeTest]);

  let resetModalInput = () => {
    setEmployeeID(employeeTest.employeeID);
    setTestBarcode(employeeTest.testBarcode);
  };

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    // integrity check: does employee exist
    let exist = props.doesEmployeeExist(employees, employeeID);
    if (!exist) {
      alert("Employee does not exist! Please input a valid Employee ID.");
      return;
    }

    // integrity check: is newly input testbarcode unique
    let unique = props.isTestBarcodeUnique(employeeTests, testBarcode);
    let sameAsBefore = isTestBarcodeSameAsBefore(employeeTest, testBarcode);
    if (!unique && !sameAsBefore) {
      alert("Test barcode is not unique! Please input a unique test barcode.");
      return;
    }

    const updatedEmployeeTest = {
      _id: employeeTest._id,
      employeeID: employeeID,
      testBarcode: testBarcode,
    };

    props.updateEmployeeTest(updatedEmployeeTest);
    toggle();
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

EmployeeTestEditModal.propTypes = {
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
  updateEmployeeTest,
})(EmployeeTestEditModal);
