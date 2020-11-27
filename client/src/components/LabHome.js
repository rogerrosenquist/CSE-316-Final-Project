import React, { useEffect } from 'react';
import { useHistory, Redirect, withRouter } from "react-router-dom";
import {
  Container, Button,
} from 'reactstrap';
import { connect } from "react-redux";
import { getEmployeeTests } from "../actions/employeeTestActions";
import PropTypes from "prop-types";

const LabHome = (props) => {

  const history = useHistory();
  console.log(props);

  useEffect(() => {
    props.getEmployeeTests();
  }, []);

  if (!props.location.state) {
    console.log(props);
    return <Redirect to="/labtech" />;
  }
    return (
      <Container className="LabHome">
            <Button color="primary" size="lg" block>Pool Mapping</Button>
            <Button color="primary" size="lg" block>Well Testing</Button>
      </Container>
    );
  }

const mapStateToProps = (state) => ({
  employeeTest: state.employeeTest,
});

export default withRouter(
  connect(mapStateToProps, {
    getEmployeeTests,
  })(LabHome)
);