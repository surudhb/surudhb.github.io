import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"
import "./Icons.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default ({ themeClass }) => {
  const theme = themeClass === "theme-rebellion" ? "light" : "dark"
  const brand = theme === "light" ? "rebel" : "empire"
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg={theme} variant={theme}>
      <Navbar.Brand className="pl-5 ml-5" as={Link} to="/">
        <FontAwesomeIcon icon={["fab", `${brand}`]} className="brand-icon" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        style={{ justifyContent: "flex-end" }}
      >
        <Nav className="pr-3 mr-4">
          <Nav.Link className="ml-2" as={Link} to="/blog">
            <span>Blog</span>
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/about">
            <span>About</span>
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/projects">
            <span>Projects</span>
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/resume">
            <span>Resume</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
