import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getWellTestings, deleteWellTesting } from "../actions/wellTestingActions";
import PropTypes from "prop-types";

const WellTesting = (props) => {
    const { wellTestings } = props.wellTesting;

    useEffect(() => {
      props.getWellTestings();
    }, []);
  
    let onDeleteClick = (id) => {
      props.deleteWellTesting(id);
    };

    return (
        <Container>
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
                      &nbsp;
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button> <br />
                      Result: {result} <br />
                      _id: {_id} <br />
                      poolBarcode: {poolBarcode} <br />
                      wellBarcode: {wellBarcode} <br /> 
                      testingStartTime: {testingStartTime} <br />   
                      testingEndTime: {testingEndTime} <br />                 
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
    getWellTestings: PropTypes.func.isRequired,
    deleteWellTesting: PropTypes.func.isRequired,
    wellTesting: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    wellTesting: state.wellTesting
});

export default connect(mapStateToProps, { getWellTestings, deleteWellTesting })(
    WellTesting
);