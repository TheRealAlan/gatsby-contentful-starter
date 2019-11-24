const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

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
        allContentfulPage {
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

      // Resolve the paths to our templates
      const blogTemplate = path.resolve('./src/templates/Blog.js');
      const pageTemplate = path.resolve('./src/templates/Page.js');

      // Assign Blog template
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

      // Assign page template
      result.data.allContentfulPage.edges.forEach((edge) => {
        createPage({
          path: `/${edge.node.slug}/`,
          component: slash(pageTemplate),
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
