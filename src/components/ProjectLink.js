import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ThemeContext from "../utils/theme-context"
import { Container, Badge, Col, Row } from "react-bootstrap"

export default props => {
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Container
          style={{ overflow: "auto" }}
          className="project-link text-center"
        >
          <Link
            className="project-link"
            to={props.to}
            style={{ textDecoration: "none" }}
          >
            <Row>
              {props.featuredImages.map(image => (
                <Col>
                  <Img
                    fluid={image}
                    style={{ maxWidth: "13rem" }}
                    className="m-auto"
                  />
                </Col>
              ))}
            </Row>
            <h2 className="mt-5">{props.title}</h2>
          </Link>
          {props.tags.map(tag => (
            <Badge key={tag} pill variant="dark" className="px-2 mr-1">
              {tag}
            </Badge>
          ))}
          <p className="pt-3 text-justify">{props.excerpt}</p>
        </Container>
      )}
    </ThemeContext.Consumer>
  )
}
