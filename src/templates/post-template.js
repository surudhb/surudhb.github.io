import React from "react"
import Container from "react-bootstrap/Container"
import { Layout, JumboTitle } from "../components"

import SEO from "../utils/seo"

export default ({ title, excerpt, html, subTitle }) => (
  <Layout>
    <SEO title={title} description={excerpt} />
    <Container className="pt-2 mt-5 text-center" fluid>
      <JumboTitle title={title} />
      {subTitle}
      <Container className="text-justify">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Container>
  </Layout>
)
