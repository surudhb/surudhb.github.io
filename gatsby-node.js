const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const contentType = node.fileAbsolutePath.includes(`content/blog`)
      ? `blog`
      : `projects`
    const path = `content/${contentType}/`
    const { createNodeField } = actions
    const slug = createFilePath({ node, getNode, basePath: path })
    createNodeField({ node, name: `slug`, value: `/${contentType}${slug}` })
    createNodeField({
      node,
      name: `templatePath`,
      value: `./src/templates/${contentType}-post.js`,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // graphql function call returns a promise
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              templatePath
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(node.fields.templatePath),
      context: {
        //   Data passed to context is available in page queries as graphql variables
        slug: node.fields.slug,
        templatePath: node.fields.templatePath,
      },
    })
  })
}
