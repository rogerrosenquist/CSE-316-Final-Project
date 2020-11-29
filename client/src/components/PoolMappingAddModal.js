import React, { useState } from "react";
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
import { addPoolMap } from "../actions/poolMapActions";
import { addPool } from "../actions/poolActions";
import PropTypes from "prop-types";

let totalTests = 0;

const PoolMappingAddModal = (props) => {
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

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    // create poolmap
    let newPoolMap = {
      poolBarcode: poolBarcode,
      testBarcode: -1,
    };
    for (var x of testBarcodes) {
      newPoolMap["testBarcode"] = x.val;
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
    for (var x of testBarcodes) {
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
    for (var x of testBarcodes) {
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
  // poolMap: PropTypes.object.isRequired,
  // getPoolMaps: PropTypes.func.isRequired,
  addPoolMap: PropTypes.func.isRequired,
  addPool: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  poolMap: state.poolMap,
});

export default connect(mapStateToProps, { addPoolMap, addPool })(
  PoolMappingAddModal
);
