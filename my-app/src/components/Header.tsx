import * as React from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
// import { IndexLinkContainer } from "react-router-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = (props) => {
  return (
    <Navbar collapseOnSelect={true}>
      <Navbar.Header>
        <Navbar.Brand>
        <Link to="/">Watch Now</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight={true}>
          <LinkContainer to="/Search">
            <NavItem eventKey={1}> Search </NavItem>
          </LinkContainer>
          <LinkContainer to="/Latest">
            <NavItem eventKey={2}> Latest Upload </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}