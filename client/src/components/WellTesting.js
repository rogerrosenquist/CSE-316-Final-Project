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

let doesPoolBarcodeExist = (pools, poolBarcode) => {
  let exist = false;
  pools.forEach((pool) => {
    if (parseInt(pool.poolBarcode) === parseInt(poolBarcode)) {
      exist = true;
    }
  });
  return exist;
};

let isWellBarcodeUnique = (wellTestings, wellBarcode) => {
  let unique = true;
  wellTestings.forEach((wellTesting) => {
    if (parseInt(wellTesting.wellBarcode) === parseInt(wellBarcode)) {
      unique = false;
    }
  });
  return unique;
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
        doesPoolBarcodeExist={doesPoolBarcodeExist}
        isWellBarcodeUnique={isWellBarcodeUnique}
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
                  <WellTestingEditModal id={_id} />
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
