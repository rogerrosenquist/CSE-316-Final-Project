import React, { useEffect, useCallback } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getEmployeeTests } from "../actions/employeeTestActions";
import { getPoolMaps } from "../actions/poolMapActions";
import { getWellTestings } from "../actions/wellTestingActions";
import PropTypes from "prop-types";

const Results = (props) => {
  // debug output
  // console.log(props);

  const { employeeTests } = props.employeeTest;
  const { poolMaps } = props.poolMap;
  const { wellTestings } = props.wellTesting;

  useEffect(() => {
    props.getEmployeeTests();
    props.getPoolMaps();
    props.getWellTestings();
  }, []);

  // useEffect(() => {
  //   getWellTestings();
  // }, [getWellTestings]);

  if (!props.location.state) {
    // console.log(props);
    return <Redirect to="/employee" />;
  }

  let currentEmployeeID = props.location.state.currentEmployeeID;

  let getResult = (testBarcode) => {
    let poolBarcode = findPoolBarcode(testBarcode);
    let result = resultFromWell(poolBarcode);
    return result;
  };

  let findPoolBarcode = (testBarcode) => {
    let poolBarcode = -1;
    poolMaps.forEach((poolMap) => {
      if (parseInt(poolMap.testBarcode) === parseInt(testBarcode)) {
        poolBarcode = parseInt(poolMap.poolBarcode);
      }
    });
    return poolBarcode;
  };

  let resultFromWell = (poolBarcode) => {
    let result = "in progress";
    wellTestings.forEach((wellTesting) => {
      if (parseInt(wellTesting.poolBarcode) === parseInt(poolBarcode)) {
        result = wellTesting.result;
      }
    });

    return result;
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="employeeTests-list">
          {employeeTests.map(
            ({ _id, collectionTime, result, employeeID, testBarcode }) => {
              if (currentEmployeeID === employeeID) {
                // console.log("match");
                return (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      Collection Time: {collectionTime}, <br></br>
                      Result: {getResult(testBarcode)}
                    </ListGroupItem>
                  </CSSTransition>
                );
              }
            }
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

Results.propTypes = {
  employeeTest: PropTypes.object.isRequired,
  getEmployeeTests: PropTypes.func.isRequired,
  poolMap: PropTypes.object.isRequired,
  getPoolMaps: PropTypes.func.isRequired,
  wellTesting: PropTypes.object.isRequired,
  getWellTestings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
  poolMap: state.poolMap,
  wellTesting: state.wellTesting,
});

export default withRouter(
  connect(mapStateToProps, {
    getEmployeeTests,
    getWellTestings,
    getPoolMaps,
  })(Results)
);
