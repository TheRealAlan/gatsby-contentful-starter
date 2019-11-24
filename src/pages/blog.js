import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Blog = ({ data }) => {
  const blogPosts = data.allContentfulBlog.edges;

  return (
    <Layout>
      <SEO title="Blog posts" />
      <h1>Blog posts</h1>
      <ul>
        {blogPosts.map(({ node: post }) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
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
        }
      }
    }
  }
`;
