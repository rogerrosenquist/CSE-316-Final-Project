/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 *
 * This file displays a list of all test components.
 * There is an option to add and delete new test components.
 */

import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getWells as getTestComponents,
  deleteWell as deleteTestComponent,
} from "../actions/wellActions"; // update here

const TestComponent = (props) => {
  const { wells: testComponents } = props.testComponent; // update here

  useEffect(() => {
    props.getTestComponents();
  }, []);

  let onDeleteClick = (id) => {
    props.deleteTestComponent(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="test-component">
          {testComponents.map(({ _id }) => (
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
                _id: {_id} <br />
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

TestComponent.propTypes = {
  getTestComponents: PropTypes.func.isRequired,
  deleteTestComponent: PropTypes.func.isRequired,
  testComponent: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  testComponent: state.well, // update here
});

export default connect(mapStateToProps, {
  getTestComponents,
  deleteTestComponent,
})(TestComponent);
