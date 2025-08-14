import { gql } from "@apollo/client";

// Flexible Content sections for the homepage (requires WPGraphQL for ACF + ACF field group)
export const FRONT_PAGE_SECTIONS_QUERY = gql`
  query FrontPageSections($uri: ID! = "/") {
    page(id: $uri, idType: URI) {
      id
      title
      sections {
        __typename
        ... on Page_Sections_Hero {
          fieldGroupName
          title
          body
          primaryCtaLabel
          primaryCtaUrl
          secondaryCtaLabel
          secondaryCtaUrl
        }
        ... on Page_Sections_TrustStrip {
          fieldGroupName
          heading
          subhead
          logos {
            name
            imageUrl
          }
        }
        ... on Page_Sections_ValuePillars {
          fieldGroupName
          items {
            title
            body
            icon
          }
        }
        ... on Page_Sections_FeaturedOffers {
          fieldGroupName
          items {
            title
            body
            ctaLabel
            ctaUrl
            flag
            icon
          }
        }
        ... on Page_Sections_HowItWorks {
          fieldGroupName
          steps {
            k
            title
            body
          }
        }
        ... on Page_Sections_CustomerStories {
          fieldGroupName
          items {
            brand
            title
            blurb
            posterUrl
            videoId
            kpis
          }
        }
        ... on Page_Sections_LeadMagnetCta {
          fieldGroupName
          title
          body
          bullets
          primaryCtaLabel
          primaryCtaUrl
          secondaryCtaLabel
          secondaryCtaUrl
        }
        ... on Page_Sections_PreFooterCta {
          fieldGroupName
          title
          body
          primaryCtaLabel
          primaryCtaUrl
          secondaryCtaLabel
          secondaryCtaUrl
        }
      }
    }
  }
`;

// Fallback tiny query that always exists (safe when ACF/GraphQL extensions aren’t installed)
export const FRONT_PAGE_MIN_QUERY = gql`
  query FrontPageMin($uri: ID! = "/") {
    page(id: $uri, idType: URI) { id title }
  }
`; 