import React from "react"
import Container from "react-bootstrap/Container"
import Header from "./Header"
import Footer from "./Footer"

export default ({ children }) => (
  <Container fluid className="px-0 app-container theme-light">
    <Header />
    <div className="pt-5 mt-5 text-center min-vh-100">
      {children}
    </div>
    <Footer />
  </Container>
)