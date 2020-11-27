import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getPoolMaps, deletePoolMap } from "../actions/poolMapActions";
import PropTypes from "prop-types";
import PoolMappingAddModal from "./PoolMappingAddModal";
import PoolMappingEditModal from "./PoolMappingEditModal";

const PoolMapping = (props) => {
  let { poolMaps } = props.poolMap;

  useEffect(() => {
    props.getPoolMaps();
  }, []);

  if (!props.location.state) {
    console.log(props);
    return <Redirect to="/labtech" />;
  }

  let onDeleteClickPool = (id) => {
    console.log(id);
    id.map((element) => {
      console.log(element._id);
      props.deletePoolMap(element._id);
    });
  };

  let onDeleteClick = (id) => {
    console.log(id);
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
      <PoolMappingAddModal />
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
                    Pool: {key} <br />
                    <br />
                    <PoolMappingEditModal id={key} />
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

export default withRouter(
  connect(mapStateToProps, { getPoolMaps, deletePoolMap })(PoolMapping)
);