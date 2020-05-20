import React from "react"
import { Container } from "react-bootstrap"
import Navbar from "./Navbar"

export default ({ themeClass }) => {
  return (
    <Container fluid className="px-0">
      <Navbar themeClass={themeClass} />
    </Container>
  )
}
