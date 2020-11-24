import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEmployees, deleteEmployee } from "../actions/employeeActions";
import PropTypes from "prop-types";
import EmployeeModal from "./EmployeeModal";
import EmployeeEditModal from "./EmployeeEditModal";
import store from "../store";

const EmployeeList = (props) => {
  let { employees } = props.employee;

  useEffect(() => {
    props.getEmployees();
  }, []);

  let onDeleteClick = (id) => {
    props.deleteEmployee(id);
  };

  // Group data by key
  let groupBy = (data, key) => {
    return data.reduce((storage, item) => {
      let group = item[key];
      storage[group] = storage[group] || [];
      storage[group].push(item);
      return storage;
    }, {});
  };
  // let fakeData = [
  //   { id: 5, num: 3 },
  //   { id: 5, num: 4 },
  //   { id: 1, num: 8 },
  // ];
  // fakeData = groupBy(fakeData, "id");
  // console.log("test ", fakeData);

  // Object.entries(fakeData).forEach(([key, values]) => {
  //   console.log(`${key}: ${values}`);
  //   values.map(({ num }) => {
  //     console.log(num);
  //   });
  // });

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="employee-list">
          {
            ((employees = groupBy(employees, "isLabWorker")),
            Object.entries(employees).map(([key, values]) => {
              return (
                <CSSTransition key={key} timeout={500} classNames="fade">
                  <Container>
                    {values.map(
                      ({
                        isLabWorker,
                        _id,
                        employeeID,
                        email,
                        firstName,
                        lastName,
                        passcode,
                      }) => (
                        <CSSTransition
                          key={_id}
                          timeout={500}
                          classNames="fade"
                        >
                          <ListGroupItem>
                            <EmployeeEditModal id={_id} />
                            &nbsp;
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
                    <hr />
                  </Container>
                </CSSTransition>
              );
            }))
          }
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
