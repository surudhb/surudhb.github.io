import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Card } from "react-bootstrap"

export default props => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "content/blog/hello-world/1.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <>
      <Card
        as={Link}
        to={props.to}
        style={{ width: "20rem", height: "22rem", textDecoration: "none" }}
      >
        <Card.Img as={Img} fluid={data.file.childImageSharp.fluid} />
        <Card.Body className="pt-3 mt-3">
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {props.subtitle}
          </Card.Subtitle>
          <Card.Text>{props.excerpt}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
