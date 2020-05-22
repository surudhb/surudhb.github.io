import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import ThemeContext from "../utils/theme-context"
import { Container, Badge } from "react-bootstrap"

export default props => {
  console.log(props.title)
  console.log(`logging featured image: ${props.featuredImage}`)
  return (
    <ThemeContext.Consumer>
      {({ dark }) => (
        <Container style={{ overflow: "auto" }} className="project-link">
          <Link
            className="project-link"
            to={props.to}
            style={{ textDecoration: "none" }}
          >
            <Img
              fluid={props.featuredImage}
              style={{ width: "7rem", height: "7rem", float: "left" }}
              className="mr-2"
            />
            <h4>{props.title}</h4>
          </Link>
          {props.tags.map(tag => (
            <Badge key={tag} pill variant="dark" className="px-2 mr-1">
              {tag}
            </Badge>
          ))}
          <p className="pt-3">{props.excerpt}</p>
        </Container>
      )}
    </ThemeContext.Consumer>
  )
}
