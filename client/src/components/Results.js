import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "../actions/employeeActions";
import {getEmployeeTests, deleteEmployeeTest} from "../actions/employeeTestActions";
import PropTypes from "prop-types";
import EmployeeModal from "./EmployeeModal";
import EmployeeEditModal from "./EmployeeEditModal";
import store from "../store";

const EmployeeList = (props) => {
  let { employeeTests } = props.employeeTest;

  useEffect(() => {
    props.getEmployeeTests();
  }, []);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="employeeTests-list">
          {
            
            Object.entries(employeeTests).map(([key, values]) => {
              return (
                <CSSTransition key={key} timeout={500} classNames="fade">
                  <Container>
                  {values.map(
                      ({
                        _id,
                        collectionTime,
                        result,
                      }) => (
                        <CSSTransition
                          key={_id}
                          timeout={500}
                          classNames="fade"
                        >
                          <ListGroupItem>
                            _id: {_id} <br />
                            
                          </ListGroupItem>
                        </CSSTransition>
                      )
                    )}
                    <hr />
                  </Container>
                </CSSTransition>
              );
            })
          }
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

EmployeeList.propTypes = {
  getEmployeeTests: PropTypes.func.isRequired,
  deleteEmployeeTest: PropTypes.func.isRequired,
  employeeTest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, { getEmployeeTests, deleteEmployeeTest })(
  EmployeeList
);
