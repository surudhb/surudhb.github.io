import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Card from "react-bootstrap/Card"
import ThemeContext from "../utils/theme-context"

export default props => (
  <ThemeContext.Consumer>
    {({ dark }) => (
      <Card
        className={dark && `bg-vader-dark`}
        as={Link}
        to={props.to}
        style={{
          width: "20rem",
          height: "22rem",
          color: "#343a40",
          textDecorationColor: `${dark ? "maroon" : "#008cff"}`,
        }}
      >
        <Card.Img
          as={Img}
          fluid={props.featuredImage}
          style={{ height: "9vw" }}
        />
        <Card.Body className={`pt-3 mt-3 ${dark && "text-white"}`}>
          <Card.Title>
            <h4>{props.title}</h4>
          </Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {props.subtitle}
          </Card.Subtitle>
          <Card.Text>{props.excerpt}</Card.Text>
        </Card.Body>
      </Card>
    )}
  </ThemeContext.Consumer>
)
