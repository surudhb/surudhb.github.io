import React from "react"
import "../styles/global.scss"
import "./Icons.js"
import { Container } from "react-bootstrap"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"

export default ({ children }) => {
  return (
    <Container fluid className="px-0">
      <Header />
      <Container fluid="lg" style={{ minHeight: "80vh" }}>
        {children}
      </Container>
      <Footer />
    </Container>
  )
}
