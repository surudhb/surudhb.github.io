import React from "react"
import Img from "gatsby-image"
import { Container, Row, Col, Badge } from "react-bootstrap"

const CompanyCard = ({ frontmatter, image }) => {
  const { company, position, startDate, endDate, location } = frontmatter
  return (
    <Container fluid className="m-auto work-history">
      <Img
        fluid={image}
        style={{
          maxHeight: "15vmax",
          maxWidth: "15vmax",
          borderRadius: company !== "Royal Victoria Hospital" && "50%",
        }}
        className="m-auto"
      />
      <div className="md-font">
        <h2 className="m-auto pt-2">{company}</h2>
        <h5 className="text-muted">{location}</h5>
        <h4 className="mt-2">{position}</h4>
        <h5 className="text-muted mt-2">
          {startDate}-{endDate}
        </h5>
      </div>
    </Container>
  )
}

export default ({ html, frontmatter, image }) => {
  return (
    <Container className="p-1 project-link text-center">
      <Row>
        <Col className="col-md-4 col-12">
          <CompanyCard frontmatter={frontmatter} image={image} />
        </Col>
        <Col className="col-md-8 col-12">
          <p
            className="text-justify mt-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Col>
      </Row>
      <Row>
        <Col className="col-md-4"></Col>
        <Col className="col-md-7 col-12">
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
}
