import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Imsas from "../content/projects/project-1/utopia.jpg"
import { Container, Badge } from "react-bootstrap"

export default props => {
  console.log(Imsas)
  return (
    <Container>
      <Link to={props.to} style={{ textDecoration: "none" }}>
        <img style={{ float: "left" }} src={Imsas} alt="I tried" />
        <h4>{props.title}</h4>
        {props.tags.map(tag => (
          <Badge key={tag} pill variant="dark" className="px-2 mr-1">
            {tag}
          </Badge>
        ))}
      </Link>
    </Container>
  )
}
