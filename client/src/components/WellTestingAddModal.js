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
} from "reactstrap";
import { connect } from "react-redux";
import { addWellTesting } from "../actions/wellTestingActions";

const WellTestingAddModal = (props) => {
  //console.log("from add:" + props.WellTesting);
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
      poolBarcode: poolBarcode,
      wellBarcode: wellBarcode,
    };

    if (newWellTest.result == "") {
      newWellTest.result = "in progress";
    }

    if (newWellTest.poolBarcode > -1 && newWellTest.wellBarcode > -1) {
      props.addWellTesting(newWellTest);
    }
    console.log(newWellTest);
    reset();
    toggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Well Testing
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a Well Testing</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="result">Result</Label>
              <Input
                type="select"
                name="Result"
                id="result"
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
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  WellTesting: state.WellTesting,
});

export default connect(mapStateToProps, { addWellTesting })(
  WellTestingAddModal
);