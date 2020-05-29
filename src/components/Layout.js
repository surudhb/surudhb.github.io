import React from "react"
import "../styles/global.scss"
import ThemeContext from "../utils/theme-context"
import "./Fontawesome.js"
import { Container } from "react-bootstrap"
import Header from "./Header"
import Footer from "./Footer"

export default ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <Container
          fluid
          className={`px-0 theme-${theme.dark ? "dark" : "light"}`}
        >
          <Container fluid className="px-0 app-container">
            <Header />
            <Container fluid="lg" className="min-vh-100">
              {children}
            </Container>
            <Footer />
          </Container>
        </Container>
      )}
    </ThemeContext.Consumer>
  )
}
