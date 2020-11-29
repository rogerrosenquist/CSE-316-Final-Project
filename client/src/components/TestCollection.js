import React, { useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  getEmployeeTests,
  deleteEmployeeTest,
} from "../actions/employeeTestActions";
import { connect } from "react-redux";
import EmployeeTestEditModal from "./EmployeeTestEditModal";
import EmployeeTestAddModal from "./EmployeeTestAddModal";
import PropTypes from "prop-types";

let doesEmployeeExist = (employees, employeeID) => {
  let exist = false;
  employees.forEach((employee) => {
    if (parseInt(employee.employeeID) === parseInt(employeeID)) {
      exist = true;
    }
  });
  return exist;
};

let isTestBarcodeUnique = (employeeTests, testBarcode) => {
  let unique = true;
  employeeTests.forEach((employeeTest) => {
    if (parseInt(employeeTest.testBarcode) === parseInt(testBarcode)) {
      unique = false;
    }
  });
  return unique;
};

let isTestBarcodeSameAsBefore = (employeeTest, testBarcode) => {
  if (parseInt(employeeTest.testBarcode) === parseInt(testBarcode)) {
    return true;
  }
  return false;
};

const TestCollection = (props) => {
  // debug output
  // console.log(props);

  const { employeeTests } = props.employeeTest;

  useEffect(() => {
    props.getEmployeeTests();
  }, []);

  let onDeleteClick = (id) => {
    props.deleteEmployeeTest(id);
  };

  if (!props.location.state) {
    return <Redirect to="/labtech" />;
  }

  return (
    <Container>
      <EmployeeTestAddModal
        doesEmployeeExist={doesEmployeeExist}
        isTestBarcodeUnique={isTestBarcodeUnique}
        isTestBarcodeSameAsBefore={isTestBarcodeSameAsBefore}
      />
      <ListGroup>
        <TransitionGroup className="test-collection">
          {employeeTests.map(({ _id, employeeID, testBarcode }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <EmployeeTestEditModal
                  _id={_id}
                  doesEmployeeExist={doesEmployeeExist}
                  isTestBarcodeUnique={isTestBarcodeUnique}
                  isTestBarcodeSameAsBefore={isTestBarcodeSameAsBefore}
                />
                &nbsp;
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={onDeleteClick.bind(this, _id)}
                >
                  &times;
                </Button>
                _id: {_id} <br />
                employeeID: {employeeID} <br />
                testBarcode: {testBarcode} <br />
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

TestCollection.propTypes = {
  employeeTest: PropTypes.object.isRequired,
  getEmployeeTests: PropTypes.func.isRequired,
  deleteEmployeeTest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default withRouter(
  connect(mapStateToProps, { getEmployeeTests, deleteEmployeeTest })(
    TestCollection
  )
);
