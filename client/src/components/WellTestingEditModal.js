import React, { Component, useState, useEffect } from "react";
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
import { updateWellTesting } from "../actions/wellTestingActions";

import PropTypes from "prop-types";

const WellTestingEditModal = (props) => {
  //console.log(props.wellTesting.wellTestings);

  const wellTesting = props.wellTesting.wellTestings.filter(
    //this part is problematic
    (wellTesting) => wellTesting._id === props.id
  )[0];

  //console.log(props.wellTesting.wellTestings);

  const [modal, setModal] = useState(false);
  const [result, setResult] = useState("");
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [wellBarcode, setWellBarcode] = useState(0);
  const toggle = () => setModal(!modal);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let reset = () => {
    let change = eval([setResult][0]);
    change("in progress");
    change = eval([setPoolBarcode][0]);
    change(-1);
    change = eval([setWellBarcode][0]);
    change(-1);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    const newWellTest = {
      result: result,
      _id: wellTesting._id,
      poolBarcode: poolBarcode,
      wellBarcode: wellBarcode,
    };

    if (newWellTest.result == "") {
      newWellTest.result = "in progress";
    }

    if (newWellTest.poolBarcode > -1 && newWellTest.wellBarcode > -1) {
      props.updateWellTesting(newWellTest);
    }
    props.updateWellTesting(newWellTest);
    reset();
    toggle();
  };

  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: "2rem", float: "right" }}
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
              <Input
                type="select"
                name="Result"
                id="result"
                value={result}
                onChange={onChange}
              >
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
                value={poolBarcode}
                onChange={onChange}
              />
              <Label for="wellBarcode">Well Barcode</Label>
              <Input
                type="text"
                name="WellBarcode"
                id="wellBarcode"
                placeholder="Well Barcode"
                value={wellBarcode}
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Edit Well Testing
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wellTesting: state.wellTesting,
});

export default connect(mapStateToProps, { updateWellTesting })(
  WellTestingEditModal
);
