import React, { useEffect } from "react";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  getEmployeeTests,
  deleteEmployeeTest,
} from "../actions/employeeTestActions";
import { connect } from "react-redux";
import EmployeeTestEditModal from "./EmployeeTestEditModal";
import EmployeeTestModal from "./EmployeeTestAddModal";
import PropTypes from "prop-types";

const TestCollection = (props) => {
  const { employeeTests } = props.employeeTest;
  const history = useHistory();

  useEffect(() => {
    props.getEmployeeTests();
  }, []);

  let onDeleteClick = (id) => {
    props.deleteEmployeeTest(id);
  };

  if (!props.location.state) {
    console.log(props);
    return <Redirect to="/labtech" />;
  }

  return (
    <Container>
      <EmployeeTestModal />
      <ListGroup>
        <TransitionGroup className="test-collection">
          {employeeTests.map(({ _id, employeeID, testBarcode }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <EmployeeTestEditModal id={_id} />
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
  getEmployeeTests: PropTypes.func.isRequired,
  deleteEmployeeTest: PropTypes.func.isRequired,
  employeeTest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default withRouter(
  connect(mapStateToProps, { getEmployeeTests, deleteEmployeeTest })(
    TestCollection
  )
);
