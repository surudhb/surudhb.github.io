import React from "react"
import CompanyCard from "./CompanyCard"
import { Container, Row, Col, Badge } from "react-bootstrap"

export default ({ html, frontmatter, image }) => (
  <Container className="p-1 project-link text-center">
    <Row>
      <Col className="col-12 mt-4">
        <CompanyCard frontmatter={frontmatter} image={image} />
      </Col>
      <Col className="col-12">
        <div className="d-inline-flex mb-4">
          {frontmatter.tags.map(tag => (
            <Badge
              key={tag}
              pill
              className="mr-1 mr-md-2 py-1 px-2 px-md-3 resume-tags"
            >
              <h5 className="m-auto">{tag}</h5>
            </Badge>
          ))}
        </div>
      </Col>
    </Row>
    <Row>
      <Col className="col-12 col-lg-8 m-auto">
        <p
          className="text-left p-large"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Col>
    </Row>
  </Container>
)
