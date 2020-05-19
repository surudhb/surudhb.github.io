import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"

export default props => {
  return (
    <Card
      as={Link}
      to={props.to}
      style={{ width: "20rem", textDecoration: "none" }}
    >
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          {props.subtitle}
        </Card.Subtitle>
        <Card.Text>{props.excerpt}</Card.Text>
      </Card.Body>
    </Card>
  )
}
