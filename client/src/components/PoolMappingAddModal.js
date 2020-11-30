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
  Container,
  InputGroup,
} from "reactstrap";
import { connect } from "react-redux";
import { getPools } from "../actions/poolActions";
import { addPoolMap } from "../actions/poolMapActions";
import { addPool } from "../actions/poolActions";
import { getEmployeeTests } from "../actions/employeeTestActions";
import PropTypes from "prop-types";

let areTestBarcodesValid = (testBarcodes, employeeTests) => {
  // create set of test barcodes in the database
  let testBarcodesDatabaseSet = [];
  employeeTests.forEach((employeeTest) => {
    testBarcodesDatabaseSet.push(employeeTest.testBarcode);
  });

  let testBarcodesDatabaseSetUsed = [];
  let isValid = true;
  testBarcodes.forEach((testBarcode) => {
    let testBarcodeVal = parseInt(testBarcode.val);
    if (testBarcodesDatabaseSetUsed.includes(testBarcodeVal)) {
      isValid = false;
    }
    if (!testBarcodesDatabaseSet.includes(testBarcodeVal)) {
      isValid = false;
    }
    testBarcodesDatabaseSetUsed.push(testBarcodeVal);
  });

  return isValid;
};

let totalTests = 0;

const PoolMappingAddModal = (props) => {
  // debug output
  // console.log(props);

  const { pools } = props.pool;
  const { employeeTests } = props.employeeTest;

  const [modal, setModal] = useState(false);
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [testBarcodes, setTestBarcodes] = useState([]);
  const toggle = () => {
    setModal(!modal);
    resetModalInput();
  };

  let resetModalInput = () => {
    setPoolBarcode(0);
    setTestBarcodes([]);
  };

  useEffect(() => {
    updateState();
  }, []);

  let updateState = () => {
    props.getPools();
    props.getEmployeeTests();
  };

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    // integrity check: is poolBarcode unique
    let unique = props.isNumberUnique(pools, poolBarcode, "poolBarcode");
    if (!unique) {
      alert("Pool barcode is not unique! Please input a unique pool barcode.");
      return;
    }

    // integrity check: are all testBarcodes valid
    let isValid = areTestBarcodesValid(testBarcodes, employeeTests);
    if (!isValid) {
      alert(
        "Not all test barcodes are valid or unique! Please input valid and unique test barcodes."
      );
      return;
    }

    // create poolmap
    let newPoolMap = {
      poolBarcode: poolBarcode,
      testBarcode: -1,
    };
    for (let x of testBarcodes) {
      newPoolMap["testBarcode"] = parseInt(x.val);
      props.addPoolMap(newPoolMap);
    }

    // create pool
    let newPool = {
      poolBarcode: poolBarcode,
    };
    props.addPool(newPool);

    toggle();
  };

  let testChange = (e) => {
    let currentIndex = 0;
    let index = -1;
    for (let x of testBarcodes) {
      if (x.id == e.target.id) {
        index = currentIndex;
        break;
      }
      currentIndex++;
    }
    if (index > -1) {
      let id = testBarcodes[index].id;
      setTestBarcodes(
        testBarcodes.map((test) => {
          if (test.id == id) {
            test.val = e.target.value;
          }
          return test;
        })
      );
      console.log(testBarcodes);
    }
  };

  let getIndex = (id) => {
    let currentIndex = 0;
    let index = -1;
    for (let x of testBarcodes) {
      if (x.id == id) {
        index = currentIndex;
        break;
      }
      currentIndex++;
    }
    return index;
  };

  let addRow = () => {
    totalTests = totalTests + 1;
    let obj = {};
    obj["id"] = "testBarcode" + totalTests;
    obj["name"] = "TestBarcode" + totalTests;
    obj["val"] = 0;
    setTestBarcodes([...testBarcodes, obj]);
  };

  let delRow = (id) => {
    let index = getIndex(id);
    if (index > -1) {
      setTestBarcodes(
        testBarcodes
          .slice(0, index)
          .concat(testBarcodes.slice(index + 1, testBarcodes.size))
      );
    }
  };

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
              {testBarcodes.map((val) => (
                <Container
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: "0.5rem",
                    padding: 0,
                  }}
                  key={val.id}
                >
                  <Label for={val.id}>Test Barcode</Label>
                  <InputGroup>
                    <Button
                      className="btn remove-btn"
                      color="danger"
                      size="sm"
                      onClick={delRow.bind(this, val.id)}
                    >
                      &times;
                    </Button>

                    <Input
                      type="text"
                      name={val.name}
                      id={val.id}
                      placeholder={val.name}
                      value={testBarcodes[getIndex(val.id)].val}
                      onChange={testChange}
                    />
                  </InputGroup>
                </Container>
              ))}
              <Button
                color="light"
                style={{ marginTop: "2rem" }}
                block
                onClick={addRow}
              >
                Add more rows
              </Button>
              <Button color="dark" style={{ marginTop: "1rem" }} block>
                Submit Pool Mapping
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

PoolMappingAddModal.propTypes = {
  pool: PropTypes.object.isRequired,
  getPools: PropTypes.func.isRequired,
  addPoolMap: PropTypes.func.isRequired,
  addPool: PropTypes.func.isRequired,
  employeeTest: PropTypes.object.isRequired,
  getEmployeeTests: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pool: state.pool,
  poolMap: state.poolMap,
  employeeTest: state.employeeTest,
});

export default connect(mapStateToProps, {
  getPools,
  addPoolMap,
  addPool,
  getEmployeeTests,
})(PoolMappingAddModal);
