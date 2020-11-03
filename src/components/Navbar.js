import React, { useContext } from "react"
import ThemeContext from "../utils/theme"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"
import "./Fontawesome.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default () => {
  const { dark, toggleDark, toString } = useContext(ThemeContext)
  return (
    <Navbar variant={toString()} fixed="top" collapseOnSelect expand="sm">
      <Navbar.Brand className="ml-md-5" as={Link} to="/">
        <FontAwesomeIcon
          icon={["fab", `${dark ? "empire" : "rebel"}`]}
          className={`brand-icon ${dark ? "empire" : "rebel"}`}
          title="Home"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className="pr-3 mr-4 nav-links">
          <Nav.Link className="ml-2" as={Link} to="/blog" title="Blog">
            Blog
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/about" title="About">
            About
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/projects" title="Projects">
            Projects
          </Nav.Link>
          <Nav.Link className="ml-2" as={Link} to="/resume" title="Resume">
            Resume
          </Nav.Link>
          <div
            onClick={toggleDark}
            onKeyDown={e => e.key === `Enter` && toggleDark()}
            role="button"
            tabIndex={0}
            className="theme-container ml-sm-3"
          >
            {dark ? (
              <FontAwesomeIcon
                icon={["fas", "sun"]}
                className="theme-toggle light-mode"
                title="Light Mode"
              />
            ) : (
              <FontAwesomeIcon
                icon={["fas", "cloud-moon"]}
                className="theme-toggle dark-mode"
                title="Dark Mode"
              />
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
