import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Container, Badge, Col, Row } from "react-bootstrap"

export default ({ excerpt, featuredImages, tags, title, to }) => {
  return (
    <Container className="text-center">
      <Link className="text-decoration-none" to={to}>
        <Row>
          {featuredImages &&
            featuredImages.map(image => (
              <Col key={image.src} className="col-6 m-auto">
                <Img fluid={image} className="m-auto w-50" />
              </Col>
            ))}
        </Row>
        <h2 className="mt-5">{title}</h2>
      </Link>
      {tags.map(tag => (
        <Badge key={tag} pill variant="dark" className="px-2 mr-1">
          {tag}
        </Badge>
      ))}
      <p className="pt-3 text-justify">{excerpt}</p>
    </Container>
  )
}
