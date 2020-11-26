import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEmployeeTests } from "../actions/employeeTestActions";
import PropTypes from "prop-types";
import store from "../store";

const EmployeeList = (props) => {
  let { employeeTests } = props.employeeTest;

  useEffect(() => {
    props.getEmployeeTests();
  }, []);

  let currentEmployeeID = props.currentEmployeeID;
  currentEmployeeID = 1; // PLACEHOLDER

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="employeeTests-list">
          {employeeTests.map(({ _id, result, employeeID }) => {
            if (currentEmployeeID === employeeID) {
              console.log("match");
              return (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>random</ListGroupItem>
                </CSSTransition>
              );
            }
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

EmployeeList.propTypes = {
  getEmployeeTests: PropTypes.func.isRequired,
  employeeTest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, {
  getEmployeeTests,
})(EmployeeList);
