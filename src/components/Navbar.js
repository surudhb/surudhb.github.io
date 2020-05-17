import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"
import "./Icons.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand className="pl-5 ml-5" as={Link} to="/">
          <FontAwesomeIcon icon={["fab", "rebel"]} className="brand-icon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ justifyContent: "flex-end" }}
        >
          <Nav className="mx-5">
            <Nav.Link as={Link} to="/blog">
              <span className="aurebesh">Blog</span>
            </Nav.Link>
            <Nav.Link className="ml-2" as={Link} to="/about">
              <span className="aurebesh">About</span>
            </Nav.Link>
            <Nav.Link className="ml-2" as={Link} to="/projects">
              <span className="aurebesh">Projects</span>
            </Nav.Link>
            <Nav.Link className="ml-2" as={Link} to="/resume">
              <span className="aurebesh">Resume</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
