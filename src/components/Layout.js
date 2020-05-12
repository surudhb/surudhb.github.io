import React from "react"
import "../styles/global.scss"
import { Container } from "react-bootstrap"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"

export default ({ children }) => {
  return (
    <>
      <Header />
      <Container fluid style={{ minHeight: "100%" }}>
        {children}
      </Container>
      <Footer />
    </>
  )
}
