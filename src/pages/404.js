import React from "react"
import Layout from "../components/Layout"
import { Container } from "react-bootstrap"

export default () => {
  return (
    <Layout>
      <Container fluid className="pt-2 mt-5">
        <h1>404: Not Found</h1>
      </Container>
    </Layout>
  )
}
