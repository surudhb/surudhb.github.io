import React from "react"
import "../styles/global.scss"
import { Container } from "react-bootstrap"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

export default ({ children }) => {
  return (
    <>
      <Navbar />
      <Container fluid>{children}</Container>
      <Footer />
    </>
  )
}
