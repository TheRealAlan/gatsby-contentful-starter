const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulBlog query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulBlog {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `,
  )
    .then((result) => {
      if (result.errors) {
        console.log('Error retrieving contentful data', result.errors);
      }

      // Resolve the paths to our template
      const blogTemplate = path.resolve('./src/templates/blog.js');

      // Then for each result we create a page.
      result.data.allContentfulBlog.edges.forEach((edge) => {
        createPage({
          path: `/blog/${edge.node.slug}/`,
          component: slash(blogTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        });
      });
    })
    .catch((error) => {
      console.log('Error retrieving contentful data', error);
    });
};
