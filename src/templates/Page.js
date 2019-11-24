import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import Copy from '../components/content_types/Copy';
import Image from '../components/content_types/Image';

function Page({ data }) {
  const { title, content } = data.contentfulPage;

  return (
    <Layout>
      <SEO title={title} />
      <article>
        {/* Header */}
        <header>
          <h1>{title}</h1>
        </header>

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

export default Page;

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
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
