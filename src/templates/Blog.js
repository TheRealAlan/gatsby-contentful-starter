import React from 'react';
import { graphql } from 'gatsby';
import { fluid } from 'gatsby-image';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import dateformat from 'dateformat';

import Copy from '../components/content_types/Copy';
import Image from '../components/content_types/Image';

function Blog({ data }) {
  const { createdAt, title, tags, content } = data.contentfulBlog;

  return (
    <Layout>
      <SEO title={title} />
      <article>
        {/* Header */}
        <header>
          <h1>{title}</h1>
          <p>
            Published on{' '}
            <time dateTime={createdAt}>
              {dateformat(createdAt, 'dddd, mmmm dS yyyy')}
            </time>
          </p>
        </header>

        {/* Tags */}
        {tags && (
          <>
            <h2>Tags</h2>
            <ul>
              {tags.map((tag) => (
                <li className="tag" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Content Types */}
        {content.map((item) => {
          switch (item.internal.type) {
            // Copy Module
            case 'ContentfulCopy':
              return (
                <Copy
                  key={item.id}
                  copy={
                    item.childContentfulCopyCopyTextNode.childMarkdownRemark
                      .html
                  }
                />
              );
            // Image Module
            case 'ContentfulImage':
              return (
                <Image
                  key={item.id}
                  image={item.image}
                  description={item.image.description}
                  caption={item.caption}
                />
              );
            default:
              return null;
          }
        })}
      </article>
    </Layout>
  );
}

export default Blog;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlog(slug: { eq: $slug }) {
      title
      slug
      createdAt
      tags
      content {
        ... on ContentfulImage {
          id
          internal {
            type
          }
          caption
          image {
            sizes(quality: 100) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
        }
        ... on ContentfulCopy {
          id
          internal {
            type
          }
          childContentfulCopyCopyTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
