/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 *
 * This file displays a list of all employees.
 * There is an option to add and delete new employees.
 * The backend is not hooked up, so adding/deleting is ok as of now.
 */

import React, { Component, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "../actions/employeeActions";
import PropTypes from "prop-types";

const EmployeeList = (props) => {
  useEffect(() => {
    props.getEmployees();
  });

  const { employees } = this.props.employee;
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
                    // onClick={}
                  >
                    &times;
                  </Button>
                  {firstName} {lastName}
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
