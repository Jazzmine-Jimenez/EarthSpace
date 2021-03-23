import React from 'react';
import AppContext from '../lib/app-context';
import { Navbar, Nav, Row } from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.renderHome = this.renderHome.bind(this);
  }

  renderHome() {
    window.location.hash = '#';
  }

  render() {
    const { handleSignOut } = this.context;
    const token = window.localStorage.getItem('earth-jwt');

    if (!token) {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
          <div className="container-fluid">
            <a className="navbar-brand">EarthSpace</a>
          </div>
        </nav>
      );
    }
    return (
    <Row>
      <Navbar className="px-3 navbar-color" collapseOnSelect fixed="top" expand="lg" bg="navbar-color" variant="dark">
        <Navbar.Brand href="#">EarthSpace</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" onClick={this.renderHome}>Home</Nav.Link>
            <Nav.Link href="#post-form">Create a Post</Nav.Link>
            <Nav.Link href="#users-posts">My Posts</Nav.Link>
            <Nav.Link onClick={handleSignOut} href="#sign-in">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Row>
    );
  }
}

Header.contextType = AppContext;
