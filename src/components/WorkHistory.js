import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ThemeContext from "../utils/theme-context"
import { Container, Badge, Col, Row } from "react-bootstrap"

export default props => {
  console.log(props)
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Container
          style={{ overflow: "auto" }}
          className="project-link text-center"
        ></Container>
      )}
    </ThemeContext.Consumer>
  )
}
