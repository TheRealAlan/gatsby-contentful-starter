import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = ({ data }) => {
  const blogPosts = data.allContentfulBlog.edges;
  return (
    <Layout>
      <SEO title="Blog posts" />
      <h1>{"Here's a list of all blogposts!"}</h1>
      <div className="blogposts">
        {blogPosts.map(({ node: post }) => (
          <div key={post.id}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </div>
        ))}
        <span className="mgBtm__24" />
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query BlogPageQuery {
    allContentfulBlog(limit: 1000) {
      edges {
        node {
          id
          title
          slug
          copy {
            copy
          }
          image {
            file {
              url
            }
          }
          tags
        }
      }
    }
  }
`;
