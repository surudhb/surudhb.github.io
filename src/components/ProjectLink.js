import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Container, Badge, Col, Row, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default ({ featuredImages, tags, github, live, title, to }) => (
  <Container className="text-center project-container">
    {/* <Row>
      {featuredImages &&
        featuredImages.map(image => (
          <Col
            key={image.src}
            className={`m-auto col-${12 / featuredImages.length}`}
          >
            <Img fluid={image} />
          </Col>
        ))}
    </Row> */}
    <Link className="text-decoration-none" to={to}>
      <h2 className="mt-5">
        <p>{title}</p>
      </h2>
    </Link>
    <div className="d-inline-flex">
      {tags.map(tag => (
        <Badge
          key={tag}
          pill
          className="mr-1 mr-md-2 py-1 px-2 px-md-3 resume-tags"
        >
          <h5 className="m-auto">{tag}</h5>
        </Badge>
      ))}
    </div>
    <br />
    <div className="mt-3 d-inline-flex">
      {live && (
        <Button className="see-live-button rounded-pill mx-md-2 px-md-3 py-md-1">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
          >
            <FontAwesomeIcon icon={["fa", "window-maximize"]} />
            &nbsp;See me live&nbsp;&nbsp;
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
            <FontAwesomeIcon icon={["fab", "github"]} />
            &nbsp;Github&nbsp;&nbsp;
            <FontAwesomeIcon icon={["fa", "link"]} />
          </a>
        </Button>
      )}
      {/* <Link className="text-decoration-none" to={to}>
        <Button variant="outline-warning" className="mx-2 px-3 py-1">
          Learn More
        </Button>
      </Link> */}
    </div>
  </Container>
)
