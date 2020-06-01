import React from "react"
import Container from "react-bootstrap/Container"
import { Layout, JumboTitle } from "../components"

import SEO from "../utils/seo"

export default ({ title, excerpt, html }) => {
  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <Container className="pt-5 mt-5 text-center" fluid>
        <JumboTitle title={title} />
        <Container className="text-justify">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
      </Container>
    </Layout>
  )
}
