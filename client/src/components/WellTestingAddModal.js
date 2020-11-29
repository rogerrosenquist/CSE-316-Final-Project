import React, { useState, useEffect } from "react";
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
import { getWellTestings, addWellTesting } from "../actions/wellTestingActions";
import PropTypes from "prop-types";

const IN_PROGRESS = "in progress";
const POSITIVE = "positive";
const NEGATIVE = "negative";

const WellTestingAddModal = (props) => {
  // debug output
  // console.log(props);

  const { wellTestings } = props.wellTesting;

  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(IN_PROGRESS);
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [wellBarcode, setWellBarcode] = useState(0);
  const toggle = () => {
    setModal(!modal);
    resetModalInput();
  };

  let resetModalInput = () => {
    setResult(IN_PROGRESS);
    setPoolBarcode(0);
    setWellBarcode(0);
  };

  useEffect(() => {
    props.getWellTestings();
  }, []);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    // TODO - integrity check: does poolBarcode exist
    // TODO - integrity check: is the wellBarcode unique
    // TODO - integrity constraint: create well for this wellbarcode

    const newWellTest = {
      result: result,
      poolBarcode: poolBarcode,
      wellBarcode: wellBarcode,
    };

    props.addWellTesting(newWellTest);
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
                <option value={IN_PROGRESS}>{IN_PROGRESS}</option>
                <option value={NEGATIVE}>{NEGATIVE}</option>
                <option value={POSITIVE}>{POSITIVE}</option>
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
};

WellTestingAddModal.propTypes = {
  wellTesting: PropTypes.object.isRequired,
  addWellTesting: PropTypes.func.isRequired,
  getWellTestings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wellTesting: state.wellTesting,
});

export default connect(mapStateToProps, { getWellTestings, addWellTesting })(
  WellTestingAddModal
);
