/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 *
 * This file displays a list of all employees.
 * There is an option to add and delete new employees.
 * The backend is not hooked up, so adding/deleting is ok as of now.
 */

import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";

import React from "react";
import PropTypes from "prop-types";

const EmployeeList = () => {
  return <div></div>;
};

EmployeeList.propTypes = {};

export default EmployeeList;

// class ItemList extends Component {
//   componentDidMount() {
//     this.props.getItems();
//   }

//   onDeleteClick = (id) => {
//     this.props.deleteItem(id);
//   };

//   render() {
//     const { items } = this.props.item;
//     return (
//       <Container>
//         <Button
//           color="dark"
//           style={{ marginBottom: "2rem" }}
//           onClick={() => {
//             const name = prompt("item: ");
//             if (name) {
//               this.setState((state) => ({
//                 items: [...state.items, { id: uuid(), name }],
//               }));
//             }
//           }}
//         >
//           Add Item
//         </Button>

//         <ListGroup>
//           <TransitionGroup className="item-list">
//             {items.map(({ id, name }) => (
//               <CSSTransition key={id} timeout={500} classNames="fade">
//                 <ListGroupItem>
//                   <Button
//                     className="remove-btn"
//                     color="danger"
//                     size="sm"
//                     onClick={this.onDeleteClick.bind(this, id)}
//                   >
//                     &times;
//                   </Button>
//                   {name}
//                 </ListGroupItem>
//               </CSSTransition>
//             ))}
//           </TransitionGroup>
//         </ListGroup>
//       </Container>
//     );
//   }
// }

// ItemList.propTypes = {
//   getItems: PropTypes.func.isRequired,
//   item: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   item: state.item,
// });

// export default connect(mapStateToProps, { getItems, deleteItem })(ItemList);
