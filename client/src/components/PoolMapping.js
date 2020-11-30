import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getPoolMaps, deletePoolMap } from "../actions/poolMapActions";
import { getPools, deletePool } from "../actions/poolActions";
import {
  getWellTestings,
  deleteWellTesting,
} from "../actions/wellTestingActions";
import { getWells, deleteWell } from "../actions/wellActions";
import PoolMappingAddModal from "./PoolMappingAddModal";
import PoolMappingEditModal from "./PoolMappingEditModal";
import PropTypes from "prop-types";

let isNumberUnique = (array, value, property) => {
  let unique = true;
  array.forEach((element) => {
    if (parseInt(element[property]) === parseInt(value)) {
      unique = false;
    }
  });
  return unique;
};

const PoolMapping = (props) => {
  // debug output
  // console.log(props);

  const { poolMaps } = props.poolMap;
  const { pools } = props.pool;
  const { wellTestings } = props.wellTesting;
  const { wells } = props.well;
  let groupedPoolMaps = poolMaps;

  useEffect(() => {
    updateState();
  }, []);

  let updateState = () => {
    props.getPoolMaps();
    props.getPools();
    props.getWellTestings();
    props.getWells();
  };

  if (!props.location.state) {
    return <Redirect to="/labtech" />;
  }

  let onDeleteClickPool = (poolGroup) => {
    let poolBarcode = poolGroup[0].poolBarcode;

    // delete poolmaps
    poolGroup.map((poolMap) => {
      props.deletePoolMap(poolMap._id);
    });

    // cascade delete pool and well testing
    cascadeDelete(poolBarcode);

    // update state after delete
    updateState();
  };

  let onDeleteClickPoolMap = (id, poolBarcode) => {
    // count number of poolMaps left with the associated poolBarcode
    let count = 0;
    poolMaps.forEach((poolMap) => {
      if (parseInt(poolMap.poolBarcode) === parseInt(poolBarcode)) {
        count++;
      }
    });

    props.deletePoolMap(id);

    // check if the poolBarcode of this poolMap still exists
    let exist = count > 1;

    if (!exist) {
      cascadeDelete(poolBarcode);
    }

    // update state after delete
    updateState();
  };

  let cascadeDelete = (poolBarcode) => {
    // delete pool
    pools.forEach((pool) => {
      if (parseInt(pool.poolBarcode) === parseInt(poolBarcode)) {
        props.deletePool(pool._id);
      }
    });

    // delete well testing
    let wellBarcode = -1;
    wellTestings.forEach((wellTesting) => {
      if (parseInt(wellTesting.poolBarcode) === parseInt(poolBarcode)) {
        props.deleteWellTesting(wellTesting._id);
        wellBarcode = wellTesting.wellBarcode;
      }
    });

    // delete well
    wells.forEach((well) => {
      if (parseInt(well.wellBarcode) === parseInt(wellBarcode)) {
        props.deleteWell(well._id);
      }
    });
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

  return (
    <Container>
      <PoolMappingAddModal isNumberUnique={isNumberUnique} />
      <ListGroup>
        <TransitionGroup className="poolMap">
          {
            ((groupedPoolMaps = groupBy(poolMaps, "poolBarcode")),
            Object.entries(groupedPoolMaps).map(([key, values]) => {
              return (
                <CSSTransition key={key} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Container style={{ margin: 0, padding: 0 }}>
                      <PoolMappingEditModal
                        id={key}
                        isNumberUnique={isNumberUnique}
                      />
                      &nbsp;
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={onDeleteClickPool.bind(this, values)}
                      >
                        &times;
                      </Button>
                      Pool: {key}
                    </Container>

                    <ListGroup style={{ width: "100%" }}>
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
                              onClick={onDeleteClickPoolMap.bind(
                                this,
                                _id,
                                poolBarcode
                              )}
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

PoolMapping.propTypes = {
  poolMap: PropTypes.object.isRequired,
  getPoolMaps: PropTypes.func.isRequired,
  deletePoolMap: PropTypes.func.isRequired,
  pool: PropTypes.object.isRequired,
  getPools: PropTypes.func.isRequired,
  deletePool: PropTypes.func.isRequired,
  wellTesting: PropTypes.object.isRequired,
  getWellTestings: PropTypes.func.isRequired,
  deleteWellTesting: PropTypes.func.isRequired,
  well: PropTypes.object.isRequired,
  getWells: PropTypes.func.isRequired,
  deleteWell: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  poolMap: state.poolMap,
  pool: state.pool,
  wellTesting: state.wellTesting,
  well: state.well,
});

export default withRouter(
  connect(mapStateToProps, {
    getPoolMaps,
    deletePoolMap,
    getPools,
    deletePool,
    getWellTestings,
    deleteWellTesting,
    getWells,
    deleteWell,
  })(PoolMapping)
);
