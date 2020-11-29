import React, { useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getWellTestings,
  deleteWellTesting,
} from "../actions/wellTestingActions";
import WellTestingAddModal from "./WellTestingAddModal";
import WellTestingEditModal from "./WellTestingEditModal";
import PropTypes from "prop-types";

const IN_PROGRESS = "in progress";
const POSITIVE = "positive";
const NEGATIVE = "negative";

let doesNumberExist = (array, value, property) => {
  let exist = false;
  array.forEach((element) => {
    if (parseInt(element[property]) === parseInt(value)) {
      exist = true;
    }
  });
  return exist;
};

let isNumberUnique = (array, value, property) => {
  let unique = true;
  array.forEach((element) => {
    if (parseInt(element[property]) === parseInt(value)) {
      unique = false;
    }
  });
  return unique;
};

let isNumberUniqueExcept = (array, value, property, initialValue) => {
  let unique = true;

  // same value, treated as unique
  if (parseInt(value) === parseInt(initialValue)) {
    return unique;
  }

  array.forEach((element) => {
    if (parseInt(element[property]) === parseInt(value)) {
      unique = false;
    }
  });
  return unique;
};

let isNumberUsed = (array, value, property) => {
  let used = false;
  array.forEach((element) => {
    if (parseInt(element[property]) === parseInt(value)) {
      used = true;
    }
  });
  return used;
};

let isNumberUsedExcept = (array, value, property, initialValue) => {
  let used = false;

  // same value, treat as unused
  if (parseInt(value) === parseInt(initialValue)) {
    return used;
  }

  array.forEach((element) => {
    if (parseInt(element[property]) === parseInt(value)) {
      used = true;
    }
  });
  return used;
};

let isNumberUpdated = (array, value, property) => {
  let updated = false;
  if (parseInt(array[property] === parseInt(value))) {
    updated = true;
  }
  return updated;
};

const WellTesting = (props) => {
  // debug output
  // console.log(props);

  const { wellTestings } = props.wellTesting;

  useEffect(() => {
    props.getWellTestings();
  }, []);

  if (!props.location.state) {
    // console.log(props);
    return <Redirect to="/labtech" />;
  }

  let onDeleteClick = (id) => {
    props.deleteWellTesting(id);
  };

  return (
    <Container>
      <WellTestingAddModal
        doesNumberExist={doesNumberExist}
        isNumberUnique={isNumberUnique}
        isNumberUsed={isNumberUsed}
        IN_PROGRESS={IN_PROGRESS}
        POSITIVE={POSITIVE}
        NEGATIVE={NEGATIVE}
      />
      <ListGroup>
        <TransitionGroup className="wellTesting-list">
          {wellTestings.map(
            ({
              result,
              _id,
              poolBarcode,
              wellBarcode,
              testingStartTime,
              testingEndTime,
            }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <WellTestingEditModal
                    id={_id}
                    doesNumberExist={doesNumberExist}
                    isNumberUniqueExcept={isNumberUniqueExcept}
                    isNumberUsedExcept={isNumberUsedExcept}
                    isNumberUpdated={isNumberUpdated}
                    IN_PROGRESS={IN_PROGRESS}
                    POSITIVE={POSITIVE}
                    NEGATIVE={NEGATIVE}
                  />
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>{" "}
                  <br />
                  result: {result} <br />
                  {/* _id: {_id} <br /> */}
                  poolBarcode: {poolBarcode} <br />
                  wellBarcode: {wellBarcode} <br />
                  {/* testingStartTime: {testingStartTime} <br />
                  testingEndTime: {testingEndTime} <br /> */}
                </ListGroupItem>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

WellTesting.propTypes = {
  wellTesting: PropTypes.object.isRequired,
  getWellTestings: PropTypes.func.isRequired,
  deleteWellTesting: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wellTesting: state.wellTesting,
});

export default withRouter(
  connect(mapStateToProps, { getWellTestings, deleteWellTesting })(WellTesting)
);
