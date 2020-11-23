/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 *
 * This file displays a list of all employee tests.
 * There is an option to add and delete new employee tests.
 */

import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getEmployeeTests,
  deleteEmployeeTest,
} from "../actions/employeeTestActions";
import PropTypes from "prop-types";
// import EmployeeTestModal from "./EmployeeTestModal";
// import EmployeeTestEditModal from "./EmployeeTestEditModal";

const EmployeeTestList = (props) => {
  console.log(props.employeeTest);
  const { employeeTests } = props.employeeTest;

  useEffect(() => {
    props.getEmployeeTests();
  }, []);

  let onDeleteClick = (id) => {
    props.deleteEmployeeTest(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="employee-test-list">
          {employeeTests.map(
            ({ _id, testBarcode, employeeID, collectionTime, collectedBy }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {/* <EmployeeTestEditModal id={_id} />
                  &nbsp; */}
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  _id: {_id} <br />
                  testBarcode: {testBarcode} <br />
                  employeeID: {employeeID} <br />
                  collectionTime: {collectionTime} <br />
                  collectedBy: {collectedBy} <br />
                </ListGroupItem>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

EmployeeTestList.propTypes = {
  getEmployeeTests: PropTypes.func.isRequired,
  deleteEmployeeTest: PropTypes.func.isRequired,
  employeeTest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, {
  getEmployeeTests,
  deleteEmployeeTest,
})(EmployeeTestList);
