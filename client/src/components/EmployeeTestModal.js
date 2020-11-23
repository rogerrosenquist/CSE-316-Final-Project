// /**
//  * THIS FILE IS FOR TESTING PURPOSES ONLY
//  */

// import React, { Component, useState } from "react";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";
// import { connect } from "react-redux";
// import { addEmployeeTest } from "../actions/employeeTestActions";

// const EmployeeTestModal = (props) => {
//   const [modal, setModal] = useState(false);
//   const [testBarcode, setTestBarcode] = useState("");
//   const [employeeID, setEmployeeID] = useState("");
//   const [collectionTime, setCollectionTime] = useState("");
//   const [collectedBy, setCollectedBy] = useState("");
//   const toggle = () => setModal(!modal);

//   let onChange = (e) => {
//     let change = eval(["set" + e.target.name][0]);
//     change(e.target.value);
//   };

//   let onSubmit = (e) => {
//     e.preventDefault();
//     const newEmployeeTest = {
//       testBarcode: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
//       employeeID: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
//       email: email,
//       firstName: firstName,
//       lastName: lastName,
//       passcode: passcode,
//     };

//     props.addEmployeeTest(newEmployeeTest);
//     toggle();
//   };

//   return (
//     <div>
//       <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
//         Add Employee Test
//       </Button>

//       <Modal isOpen={modal} toggle={toggle}>
//         <ModalHeader toggle={toggle}>Add an Employee Test</ModalHeader>
//         <ModalBody>
//           <Form onSubmit={onSubmit}>
//             <FormGroup>
//               <Label for="firstName">First Name</Label>
//               <Input
//                 type="text"
//                 name="FirstName"
//                 id="firstName"
//                 placeholder="First Name"
//                 onChange={onChange}
//               />
//               <Label for="lastName">Last Name</Label>
//               <Input
//                 type="text"
//                 name="LastName"
//                 id="lastName"
//                 placeholder="Last Name"
//                 onChange={onChange}
//               />
//               <Label for="email">Email</Label>
//               <Input
//                 type="email"
//                 name="Email"
//                 id="email"
//                 placeholder="Email"
//                 onChange={onChange}
//               />
//               <Label for="firstName">Passcode</Label>
//               <Input
//                 type="password"
//                 name="Passcode"
//                 id="passcode"
//                 placeholder="Passcode"
//                 onChange={onChange}
//               />
//               <Button color="dark" style={{ marginTop: "2rem" }} block>
//                 Add Employee Test
//               </Button>
//             </FormGroup>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   employeeTest: state.employeeTest,
// });

// export default connect(mapStateToProps, { addEmployeeTest })(EmployeeTestModal);
