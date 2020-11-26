import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import {
  setWellTestingsLoading,
  updateWellTesting,
} from "../actions/WellTestingActions";

import PropTypes from "prop-types";

const WellTestingEditModal = (props) => {
  const wellTesting = props.employeeTest.employeeTests.filter( //? Change
    (employeeTest) => employeeTest._id === props.id
  )[0];

  const [modal, setModal] = useState(false);
  const [result, setResult] = useState("");
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [wellBarcode, setWellBarcode] = useState(0);
  const toggle = () => setModal(!modal);

  useEffect(() => { //? //Change
    if (wellTesting) {
      //setEmployeeID(employeeTest.employeeID);
      //setTestBarcode(employeeTest.testBarcode);
    }
  }, [employeeTest]);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();
    const updatedWellTesting = {
      _id: wellTesting._id,
      result: result,
      poolBarcode: poolBarcode,
      wellBarcode: wellBarcode,
    };

    props.updateWellTesting(updatedWellTesting);
    toggle();
  };

  return (
    <div style={{ float: "right" }}>
      <Button
        className="edit-btn"
        color="dark"
        size="sm"
        style={{ marginBottom: "2rem" }}
        onClick={toggle}
      >
        Edit Well Testing
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit a Well Testing</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
          <FormGroup>
              <Label for="result">Result</Label>
              <Input type="select" name="Result" id="result" onChange={onChange}>
                  <option value="in progress">In progress</option>
                  <option value="negative">Negative</option>
                  <option value="postive">Positive</option>
              </Input>
              <Label for="poolBarcode">Pool Barcode</Label>
              <Input
                type="text"
                name="PoolBarcode"
                id="poolBarcode"
                placeholder="Pool Barcode"
                onChange={onChange}
              />
              <Label for="wellBarcode">Well Barcode</Label>
              <Input
                type="text"
                name="WellBarcode"
                id="wellBarcode"
                placeholder="Well Barcode"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Well Testing
              </Button>
            </FormGroup>
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Update Well Testing
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

WellTestingEditModal.propTypes = {};

const mapStateToProps = (state) => ({
  wellTesting: state.wellTesting,
});

export default connect(mapStateToProps, { updateWellTesting })(WellTestingEditModal);