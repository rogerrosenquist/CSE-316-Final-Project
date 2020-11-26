import React, { Component } from 'react';
import {
  Container, Col, Button,
} from 'reactstrap';

class LabHome extends Component {
  render() {
    return (
      <Container className="LabHome">
            <Button color="primary" size="lg" block>Pool Mapping</Button>
            <Button color="primary" size="lg" block>Well Testing</Button>
      </Container>
    );
  }
}

export default LabHome;