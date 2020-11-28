import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getPoolMaps, deletePoolMap } from "../actions/poolMapActions";
import PropTypes from "prop-types";
import PoolMappingAddModal from "./PoolMappingAddModal";
import PoolMappingEditModal from "./PoolMappingEditModal";

const PoolMapping = (props) => {
  // debug output
  // console.log(props);

  const { poolMaps } = props.poolMap;
  let groupedPoolMaps = poolMaps;

  useEffect(() => {
    props.getPoolMaps();
  }, []);

  if (!props.location.state) {
    return <Redirect to="/labtech" />;
  }

  let onDeleteClickPool = (poolGroup) => {
    poolGroup.map((poolMap) => {
      props.deletePoolMap(poolMap._id);
    });

    // cascade delete: look into delete flags.
  };

  let onDeleteClickPoolMap = (id) => {
    props.deletePoolMap(id);

    // check if the poolBarcode of this poolMap still exists
    // if not, cascade delete pool
    // delete all wellTesting with the same poolBarcode
    // delete that well
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
      <PoolMappingAddModal />
      <ListGroup>
        <TransitionGroup className="poolMap">
          {
            ((groupedPoolMaps = groupBy(poolMaps, "poolBarcode")),
            Object.entries(groupedPoolMaps).map(([key, values]) => {
              return (
                <CSSTransition key={key} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <PoolMappingEditModal id={key} />
                    &nbsp;
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={onDeleteClickPool.bind(this, values)}
                    >
                      &times;
                    </Button>
                    Pool: {key} <br />
                    <br />
                    <ListGroup>
                      {values.map(({ _id, testBarcode }) => (
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
                              onClick={onDeleteClickPoolMap.bind(this, _id)}
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
};

const mapStateToProps = (state) => ({
  poolMap: state.poolMap,
});

export default withRouter(
  connect(mapStateToProps, { getPoolMaps, deletePoolMap })(PoolMapping)
);
