import React from "react"
import { Jumbotron } from "react-bootstrap"

export default ({ title }) => {
  return (
    <Jumbotron className="bg-white pt-5 pb-0">
      <h1>{title}</h1>
    </Jumbotron>
  )
}
