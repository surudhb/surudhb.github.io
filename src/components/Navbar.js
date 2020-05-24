import React from "react"
import {
  Navbar,
  Nav,
  ToggleButtonGroup,
  ToggleButton,
  Image,
} from "react-bootstrap"
import { Link } from "gatsby"
import "./Icons.js"
import ThemeContext from "../utils/theme-context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <Navbar
          fixed="top"
          collapseOnSelect
          expand="lg"
          bg={theme.dark ? "vader-dark" : "light"}
          variant={theme.dark ? "dark" : "light"}
        >
          <Navbar.Brand className="pl-5 ml-5" as={Link} to="/">
            <FontAwesomeIcon
              icon={["fab", `${theme.dark ? "empire" : "rebel"}`]}
              className={`brand-icon ${theme.dark ? "empire" : "rebel"}`}
            />
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
              <Nav.Item
                className="ml-2"
                as={ToggleButtonGroup}
                onChange={theme.toggleDark}
                defaultValue={1}
                name="options"
                type="radio"
              >
                <ToggleButton
                  value={1}
                  className="bg-warning m-auto checkbox-inline"
                >
                  <Image
                    rounded
                    width="20"
                    height="20"
                    src={`../../icons/c3po-toggle.png`}
                    alt="Light mode"
                    className="m-auto"
                  />
                </ToggleButton>
                <ToggleButton value={2} className="bg-dark">
                  <Image
                    rounded
                    width="20"
                    height="20"
                    src={`../../icons/stormtrooper-toggle.png`}
                    alt="Dark mode"
                    className="m-auto"
                  />
                </ToggleButton>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </ThemeContext.Consumer>
  )
}
