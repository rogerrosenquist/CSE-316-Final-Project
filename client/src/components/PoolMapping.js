import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getPoolMaps, deletePoolMap } from "../actions/poolMapActions";
import PropTypes from "prop-types";

const PoolMapping = (props) => {
  let { poolMaps } = props.poolMap;

  useEffect(() => {
    props.getPoolMaps();
  }, []);

  let onDeleteClickPool = (id) => {
    console.log(id);
    id.map(element => {
      console.log(element._id);
      props.deletePoolMap(element._id);
    });
  };

  let onDeleteClick = (id) => {
    props.deletePoolMap(id);
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

  let grouped = groupBy(poolMaps, "poolBarcode");
  //console.log(grouped);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="poolMap-list">
          {
            ((poolMaps = groupBy(poolMaps, "poolBarcode")),
            Object.entries(poolMaps).map(([key, values]) => {
              return (
                <CSSTransition key={key} timeout={500} classNames="fade">
                  <ListGroupItem>
                    &nbsp;
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={onDeleteClickPool.bind(this, values)}
                    >
                      &times;
                    </Button>
                    Pool: {key} <br /><br />
                    <ListGroup>
                      {values.map(({ _id, testBarcode, poolBarcode }) => (
                        <CSSTransition
                          key={_id}
                          timeout={500}
                          classNames="fade"
                        >
                          <ListGroupItem>
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={onDeleteClick.bind(this, _id)}
                            >
                              &times;
                            </Button>
                            Test: {testBarcode}
                          </ListGroupItem>
                        </CSSTransition>
                      ))}
                    </ListGroup>
                  </ListGroupItem>
                </CSSTransition>
              );
            }))
          }
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
