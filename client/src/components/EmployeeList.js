/**
 * THIS FILE IS FOR TESTING PURPOSES ONLY
 */

import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
