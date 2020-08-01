import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Container, Badge, Col, Row, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default ({
  inProgress,
  featuredImages,
  tags,
  github,
  live,
  title,
  to,
}) => {
  return (
    <Container className="text-center">
      <Link className="text-decoration-none" to={to}>
        <Row>
          {featuredImages &&
            featuredImages.map(image => (
              <Col
                key={image.src}
                className={`m-auto col-${12 / featuredImages.length}`}
              >
                <Img fluid={image} />
              </Col>
            ))}
        </Row>
        <h2 className="mt-5">
          <p>
            {title}
            {inProgress && (
              <small>
                <small className="align-top">
                  &nbsp;
                  <Badge pill variant="warning">
                    <span className="text-dark">In Progress</span>
                  </Badge>
                </small>
              </small>
            )}
          </p>
        </h2>
      </Link>
      <div className="d-inline-flex">
        {tags.map(tag => (
          <Badge
            key={tag}
            pill
            className="mr-1 mr-md-2 p-0 px-2 px-md-3 resume-tags"
          >
            <h5>
              <small>{tag}</small>
            </h5>
          </Badge>
        ))}
      </div>
      <br />
      <div className="mt-3 d-inline-flex">
        {live && (
          <Button className="rounded-pill mx-2 px-3 py-1">
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none"
            >
              See me live&nbsp;&nbsp;
              <FontAwesomeIcon icon={["fa", "link"]} />
            </a>
          </Button>
        )}
        {github && (
          <Button variant="dark" className="mx-2 px-3 py-1">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none"
            >
              Github&nbsp;&nbsp;
              <FontAwesomeIcon icon={["fa", "link"]} />
            </a>
          </Button>
        )}
      </div>
    </Container>
  )
}
