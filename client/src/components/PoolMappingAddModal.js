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
import { v4 as uuid } from "uuid";

let totalTests = 0;

const PoolMappingAddModal = (props) => {
  const [modal, setModal] = useState(false);
  const [poolBarcode, setPoolBarcode] = useState(0);
  const [testBarcode, setTestBarcode] = useState([]);
  const toggle = () => setModal(!modal);

  let onChange = (e) => {
    let change = eval(["set" + e.target.name][0]);
    change(e.target.value);
  };

  let testChange = (e) => {
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
      // let newVal = e.target.value;
      setTestBarcode(
        testBarcode.map((test) => {
          if (test.id == id) {
            test.val = e.target.value;
          }
          return test;
        })
      );
      console.log(testBarcode);
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

  let onSubmit = (e) => {
    e.preventDefault();
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
                <Container style={{ margin: 0, padding: 0 }} key={uuid()}>
                  <Label for={val.id}>Test Barcode</Label>
                  <Input
                    type="text"
                    name={val.name}
                    id={val.id}
                    placeholder={val.name}
                    value={testBarcode[getIndex(val.id)].val}
                    onChange={testChange}
                  />
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={delRow.bind(this, val.id)}
                  ></Button>
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
