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
import { addPoolMap, deletePoolMap } from "../actions/poolMapActions";
import { addPool } from "../actions/poolActions";
import { getEmployeeTests } from "../actions/employeeTestActions";
import PropTypes from "prop-types";

let totalTests = 0;

const PoolMappingEditModal = (props) => {
  // debug output
  // console.log(props);

  const { pools } = props.pool;

  const poolMap = props.poolMap.poolMaps.filter(
    (poolMap) => poolMap.poolBarcode == props.id
  );

  const [modal, setModal] = useState(false);
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [testBarcode, setTestBarcode] = useState([]);
  const toggle = () => {
    setModal(!modal);
    resetModalInput();
  };

  let resetModalInput = () => {
    populateRows();
  };

  useEffect(() => {
    populateRows();
    setPoolBarcode(props.id);
  }, [modal]);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let onSubmit = (e) => {
    e.preventDefault();

    // delete original pool, then insert all new ones
    poolMap.map((element) => {
      // code copied from poolMapping, deletes all of specific pool
      // console.log(element._id);
      props.deletePoolMap(element._id);
    });

    // integrity check: is poolBarcode unique
    // preventing changing poolBarcode to existing one. Must only edit via the edit button of the existing pool.
    // let unique = props.isNumberUnique(pools, poolBarcode, "poolBarcode");
    // if (!unique) {
    //   alert("Pool barcode is not unique! Please input a unique pool barcode.");

    //   console.log(poolMap);
    //   // reinsert
    //   poolMap.map((element) => {
    //     let newPoolMap = {
    //       poolBarcode: element.poolBarcode,
    //       testBarcode: element.testBarcode,
    //     };
    //     props.addPoolMap(newPoolMap);
    //   });

    //   return;
    // }

    let newPoolMap = {
      poolBarcode: poolBarcode,
      testBarcode: -1,
    };
    for (var x of testBarcode) {
      newPoolMap["testBarcode"] = x.val;
      props.addPoolMap(newPoolMap);
    }
    toggle();
  };

  let addRow = () => {
    totalTests = totalTests + 1;
    let obj = {};
    obj["id"] = "testBarcode" + totalTests;
    obj["name"] = "TestBarcode" + totalTests;
    obj["val"] = 0;
    setTestBarcode([...testBarcode, obj]);
  };

  let delRow = (id) => {
    let index = getIndex(id);
    if (index > -1) {
      setTestBarcode(
        testBarcode
          .slice(0, index)
          .concat(testBarcode.slice(index + 1, testBarcode.size))
      );
    }
  };

  let populateRows = () => {
    let tests = [];
    for (var x of poolMap) {
      totalTests = totalTests + 1;
      let obj = {};
      obj["id"] = "testBarcode" + totalTests;
      obj["name"] = "TestBarcode" + totalTests;
      obj["val"] = x.testBarcode;
      tests = [...tests, obj];
    }
    setTestBarcode(tests);
  };

  let testChange = (e) => {
    e.preventDefault();
    console.log(testBarcode);
    let currentIndex = 0;
    let index = -1;
    for (var x of testBarcode) {
      if (x.id == e.target.id) {
        index = currentIndex;
        break;
      }
      currentIndex++;
    }
    if (index > -1) {
      let id = testBarcode[index].id;
      //testBarcode[index] = e.target.value;
      setTestBarcode(
        testBarcode.map((test) => {
          if (test.id == id) {
            test.val = e.target.value;
          }
          return test;
        })
      );
      //console.log(e.target.value);
    }
  };

  let getIndex = (id) => {
    let currentIndex = 0;
    let index = -1;
    for (var x of testBarcode) {
      if (x.id == id) {
        index = currentIndex;
        break;
      }
      currentIndex++;
    }
    return index;
  };

  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: "0.5rem", float: "right" }}
        onClick={toggle}
      >
        Edit Pool Mapping
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Pool Mapping</ModalHeader>
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
                      value={testBarcode[getIndex(val.id)].val}
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

PoolMappingEditModal.propTypes = {
  pool: PropTypes.object.isRequired,
  getPools: PropTypes.func.isRequired,
  addPoolMap: PropTypes.func.isRequired,
  deletePoolMap: PropTypes.func.isRequired,
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
  deletePoolMap,
  addPool,
  getEmployeeTests,
})(PoolMappingEditModal);
