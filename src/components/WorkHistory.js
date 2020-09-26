import React from "react"
import CompanyCard from "./CompanyCard"
import { Container, Row, Col, Badge } from "react-bootstrap"

export default ({ html, frontmatter, image }) => (
  <Container className="p-1 project-link text-center">
    <Row>
      <Col className="col-12 my-4">
        <CompanyCard frontmatter={frontmatter} image={image} />
      </Col>
      <Col className="col-12 col-lg-8 m-auto">
        <p
          className="text-left p-large"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Col>
    </Row>
    <Row>
      <Col className="col-12">
        <div className="d-inline-flex">
          {frontmatter.tags.map(tag => (
            <Badge
              key={tag}
              pill
              className="align-text-top mr-1 mr-md-2 p-0 px-2 px-md-3 resume-tags"
            >
              <h5>
                <small>{tag}</small>
              </h5>
            </Badge>
          ))}
        </div>
      </Col>
    </Row>
  </Container>
)
