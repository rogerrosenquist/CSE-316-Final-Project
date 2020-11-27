import React, { Component, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import { addPoolMap } from "../actions/poolMapActions";

const PoolMappingAddModal = (props) => {
  const [modal, setModal] = useState(false);
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [testBarcode, setTestBarcode] = useState([]);
  const toggle = () => setModal(!modal);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    const newPoolMap = {
      poolBarcode: poolBarcode,
      testBarcode: testBarcode,
    };

    props.addPoolMap(newPoolMap);
    toggle();
  };

  let addRow = () => {
    testBarcode.push(0);
    console.log(testBarcode);
  }

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Pool Mapping
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a Pool Mapping</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="poolBarcode">Pool Barcode</Label>
              <Input
                type="text"
                name="PoolBarcode"
                id="poolBarcode"
                placeholder="Pool Barcode"
                onChange={onChange}
              />
              {testBarcode.map((val) => ( 
                <Container>
                <Label for="testBarcode">Test Barcode</Label>
                <Input
                  type="text"
                  name="TestBarcode"
                  id="testBarcode"
                  placeholder="Test Barcode"
                  onChange={onChange}
                />
                </Container>
              ))}
              <Button color="light" style={{ marginTop: "2rem" }} block onClick={addRow}>
                Add more rows
              </Button>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Submit Pool Mapping
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  PoolMapping: state.PoolMapping,
});

export default connect(mapStateToProps, { addPoolMap })(PoolMappingAddModal);
