import React from "react"
import { Jumbotron } from "react-bootstrap"

export default ({ title, children }) => (
  <Jumbotron className="bg-none mx-5 pb-0">
    <h1>
      <span>
        {title}
        {children && <>{children}</>}
      </span>
    </h1>
  </Jumbotron>
)
