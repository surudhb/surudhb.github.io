import React from "react"
import { Form, FormControl } from "react-bootstrap"
import "../../static/fonts/Aurabesh/fonts.css"

export default () => {
  return (
    <Form
      className="my-5"
      style={{ fontFamily: "Aurabesh, Montserrat, sans-serif" }}
    >
      <FormControl type="text" placeholder="Search" />
    </Form>
  )
}
