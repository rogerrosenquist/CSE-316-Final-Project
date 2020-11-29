import React from "react";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import { Container, Button } from "reactstrap";

const LabHome = (props) => {
  // debug output
  // console.log(props);

  const history = useHistory();

  let changePaths = (e, path) => {
    e.preventDefault();
    history.push({
      pathname: path,
      search: "",
      state: { currentEmployeeID: props.location.state.currentEmployeeID },
    });
  };

  if (!props.location.state) {
    console.log(props);
    return <Redirect to="/labtech" />;
  }
  return (
    <Container className="LabHome">
      <Button
        className="btn"
        color="dark"
        size="lg"
        block
        onClick={(e) => changePaths(e, "poolmapping")}
      >
        Pool Mapping
      </Button>
      <Button
        className="btn"
        color="dark"
        size="lg"
        block
        onClick={(e) => changePaths(e, "welltesting")}
      >
        Well Testing
      </Button>
      <Button
        className="btn"
        color="dark"
        size="lg"
        block
        onClick={(e) => changePaths(e, "testcollection")}
      >
        Test Collection
      </Button>
    </Container>
  );
};

export default withRouter(LabHome);
