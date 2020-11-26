import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEmployeeTests } from "../actions/employeeTestActions";
import PropTypes from "prop-types";
import store from "../store";

const Results = (props) => {
  let { employeeTests } = props.employeeTest;
  const history = useHistory();
  console.log(props)

  useEffect(() => {
    props.getEmployeeTests();
  }, []);

  if (!props.location){
    return <Redirect to='/employee' />
  }

  let currentEmployeeID = 1;
  // let currentEmployeeID = props.location.state.currentEmployeeID;

  // console.log(currentEmployeeID);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="employeeTests-list">
          {employeeTests.map(({ _id, collectionTime, result, employeeID }) => {
            if (currentEmployeeID === employeeID) {
              console.log("match");
              return (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                      Collection Time: {collectionTime}, <br></br>
                      Result: {result}
                  </ListGroupItem>
                </CSSTransition>
              );
            }
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

Results.propTypes = {
  getEmployeeTests: PropTypes.func.isRequired,
  employeeTest: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, {
  getEmployeeTests,
})(Results);