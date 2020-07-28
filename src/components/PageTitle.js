import React from "react"
import { Jumbotron } from "react-bootstrap"

export default ({ title, children }) => (
  <Jumbotron className="bg-none pt-4 mb-5 pb-0">
    <h1>
      <p>
        {title}
        {children && <span>{children}</span>}
      </p>
    </h1>
  </Jumbotron>
)
