import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getPoolMaps, deletePoolMap } from "../actions/poolMapActions";
import PropTypes from "prop-types";

const PoolMapping = (props) => {
    const { poolMaps } = props.poolMap;

    useEffect(() => {
      props.getPoolMaps();
    }, []);
  
    let onDeleteClick = (id) => {
      props.deletePoolMap(id);
    };

    return (
        <Container>
          <ListGroup>
            <TransitionGroup className="poolMap-list">
                {poolMaps.map(
                ({
                  _id,
                  testBarcode,
                  poolBarcode,
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
                      </Button>
                      Pool: {poolBarcode}    Test: {testBarcode}
                    </ListGroupItem>
                  </CSSTransition>
                )
              )}
            </TransitionGroup>
          </ListGroup>
        </Container>
      );
};

//{poolMaps.aggregate(({$group:{"_id":"$poolBarcode", "testBarcodes":{$push:"$testBarcode"}}}) => (
//export default PoolMapping;

PoolMapping.propTypes = {
    getPoolMaps: PropTypes.func.isRequired,
    deletePoolMap: PropTypes.func.isRequired,
    poolMap: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    poolMap: state.poolMap,
});

export default connect(mapStateToProps, { getPoolMaps, deletePoolMap })(
    PoolMapping
);