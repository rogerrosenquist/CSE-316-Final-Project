import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarBrand,
} from "reactstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand tag={Link} to="/">
            SBU COVID Testing Interface
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/Login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/EmployeeLogin">
                  Employee Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/labtech">
                  LabTech
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/employee">
                  Employee
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
