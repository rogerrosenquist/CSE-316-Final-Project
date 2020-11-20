/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 *
 * This file displays a list of all employees.
 * There is an option to add and delete new employees.
 * The backend is not hooked up, so adding/deleting is ok as of now.
 */

import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "../actions/employeeActions";
import PropTypes from "prop-types";

const EmployeeList = (props) => {
  const { employees } = props.employee;

  useEffect(() => {
    props.getEmployees();
  }, [employees]);

  let onDeleteClick = (id) => {
    props.deleteEmployee(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="employee-list">
          {employees.map(
            ({
              isLabWorker,
              _id,
              employeeID,
              email,
              firstName,
              lastName,
              passcode,
            }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {firstName} {lastName} <br />
                  _id: {_id} <br />
                  employeeID: {employeeID} <br />
                  email: {email} <br />
                  passcode: {passcode} <br />
                  isLabWorker: {String(isLabWorker)} <br />
                </ListGroupItem>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

EmployeeList.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employee,
});

export default connect(mapStateToProps, { getEmployees, deleteEmployee })(
  EmployeeList
);
