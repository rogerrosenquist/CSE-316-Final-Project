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
import { getPools } from "../actions/poolActions";
import { getWellTestings, addWellTesting } from "../actions/wellTestingActions";
import { getWells, addWell } from "../actions/wellActions";
import PropTypes from "prop-types";

const WellTestingAddModal = (props) => {
  // debug output
  // console.log(props);

  const { pools } = props.pool;
  const { wellTestings } = props.wellTesting;
  const { wells } = props.well;

  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(props.IN_PROGRESS);
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [wellBarcode, setWellBarcode] = useState(0);
  const toggle = () => {
    setModal(!modal);
    resetModalInput();
  };

  let resetModalInput = () => {
    setResult(props.IN_PROGRESS);
    setPoolBarcode(0);
    setWellBarcode(0);
  };

  useEffect(() => {
    updateState();
  }, []);

  let updateState = () => {
    props.getPools();
    props.getWellTestings();
    props.getWells();
  };

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    // integrity check: does poolBarcode exist
    let exist = props.doesNumberExist(pools, poolBarcode, "poolBarcode");
    if (!exist) {
      alert("Pool barcode does not exist! Please input a valid pool barcode.");
      return;
    }

    // integrity check: is this poolBarcode already used by another well
    let used = props.isNumberUsed(wellTestings, poolBarcode, "poolBarcode");
    if (used) {
      alert(
        "Pool barcode is already used by another well! Please input a valid & unused pool barcode."
      );
      return;
    }

    // integrity check: is the wellBarcode unique
    let unique = props.isNumberUnique(wells, wellBarcode, "wellBarcode");
    if (!unique) {
      alert("Well barcode is not unique! Please input a unique well barcode.");
      return;
    }

    // integrity constraint: create well for this new/unique wellBarcode
    const newWell = {
      wellBarcode: wellBarcode,
    };
    props.addWell(newWell);

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
                <option value={props.IN_PROGRESS}>{props.IN_PROGRESS}</option>
                <option value={props.NEGATIVE}>{props.NEGATIVE}</option>
                <option value={props.POSITIVE}>{props.POSITIVE}</option>
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
  pool: PropTypes.object.isRequired,
  getPools: PropTypes.func.isRequired,
  wellTesting: PropTypes.object.isRequired,
  addWellTesting: PropTypes.func.isRequired,
  getWellTestings: PropTypes.func.isRequired,
  well: PropTypes.object.isRequired,
  addWell: PropTypes.func.isRequired,
  getWells: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pool: state.pool,
  wellTesting: state.wellTesting,
  well: state.well,
});

export default connect(mapStateToProps, {
  getPools,
  getWellTestings,
  addWellTesting,
  getWells,
  addWell,
})(WellTestingAddModal);
