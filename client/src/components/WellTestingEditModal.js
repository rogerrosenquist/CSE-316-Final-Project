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
import {
  getWellTestings,
  updateWellTesting,
} from "../actions/wellTestingActions";
import { getWells, addWell, deleteWell } from "../actions/wellActions";
import PropTypes from "prop-types";

const WellTestingEditModal = (props) => {
  // debug output
  // console.log(props);

  const { pools } = props.pool;
  const { wellTestings } = props.wellTesting;
  const { wells } = props.well;

  const wellTesting = props.wellTesting.wellTestings.filter(
    (wellTesting) => wellTesting._id === props.id
  )[0];

  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(props.IN_PROGRESS);
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [wellBarcode, setWellBarcode] = useState(0);
  const toggle = () => {
    setModal(!modal);
    resetModalInput();
  };

  let resetModalInput = () => {
    setResult(wellTesting.result);
    setPoolBarcode(wellTesting.poolBarcode);
    setWellBarcode(wellTesting.wellBarcode);
  };

  useEffect(() => {
    updateState();
  }, []);

  let updateState = () => {
    props.getPools();
    props.getWellTestings();
    props.getWells();
  };

  useEffect(() => {
    if (wellTesting) {
      resetModalInput();
    }
  }, [wellTesting]);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    /**
     * Idea
     * Run same functions as AddModal, but pass in a value to skip
     * If the add is valid, update with these values
     * otherwise, just alert
     */

    // integrity check: does poolBarcode exist
    let exist = props.doesNumberExist(pools, poolBarcode, "poolBarcode");
    if (!exist) {
      alert("Pool barcode does not exist! Please input a valid pool barcode.");
      return;
    }

    // integrity check: is this poolBarcode already used by another well besides the current one
    let used = props.isNumberUsedExcept(
      wellTestings,
      poolBarcode,
      "poolBarcode",
      wellTesting.poolBarcode
    );
    if (used) {
      alert(
        "Pool barcode is already used by another well! Please input a valid & unused pool barcode."
      );
      return;
    }

    // integrity check: is the wellBarcode unique besides the current well
    let unique = props.isNumberUniqueExcept(
      wells,
      wellBarcode,
      "wellBarcode",
      wellTesting.wellBarcode
    );
    if (!unique) {
      alert("Well barcode is not unique! Please input a unique well barcode.");
      return;
    }

    // delete old well

    let wellBarcodeID = -1;
    wells.forEach((well) => {
      console.log(parseInt(well.wellBarcode));
      console.log(parseInt(wellTesting.wellBarcode));

      if (parseInt(well.wellBarcode) === parseInt(wellTesting.wellBarcode)) {
        wellBarcodeID = well._id;
      }
    });
    if (parseInt(wellBarcodeID) !== -1) {
      props.deleteWell(wellBarcodeID);
    }

    const updatedWellTest = {
      result: result,
      _id: wellTesting._id,
      poolBarcode: poolBarcode,
      wellBarcode: wellBarcode,
    };

    // add new well
    const newWell = {
      wellBarcode: wellBarcode,
    };
    props.addWell(newWell);

    props.updateWellTesting(updatedWellTest);
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

WellTestingEditModal.propTypes = {
  pool: PropTypes.object.isRequired,
  getPools: PropTypes.func.isRequired,
  wellTesting: PropTypes.object.isRequired,
  getWellTestings: PropTypes.func.isRequired,
  well: PropTypes.object.isRequired,
  addWell: PropTypes.func.isRequired,
  getWells: PropTypes.func.isRequired,
  deleteWell: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pool: state.pool,
  wellTesting: state.wellTesting,
  well: state.well,
});

export default connect(mapStateToProps, {
  getPools,
  getWellTestings,
  updateWellTesting,
  getWells,
  addWell,
  deleteWell,
})(WellTestingEditModal);
