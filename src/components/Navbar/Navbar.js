import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"

export default () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand className="ml-5" as={Link} to="/">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios/500/000000/rebel.png"
            alt="rebel-scum"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ justifyContent: "flex-end" }}
        >
          <Nav>
            <Nav.Link className="mx-2" as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link className="mx-2" as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link className="mx-2" as={Link} to="/projects">
              Projects
            </Nav.Link>
            <Nav.Link className="mx-2" as={Link} to="/resume">
              Resume
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
