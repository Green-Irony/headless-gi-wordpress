import { gql } from "@apollo/client";

export const HEADER_MENU_QUERY = gql`
  query GetHeaderMenu {
    primaryMenuItems: menuItems(where: { location: PRIMARY }, first: 100) {
      nodes {
        id
        databaseId
        uri
        path
        label
        parentId
        cssClasses
        menu {
          node {
            name
          }
        }
      }
    }
  }
`;
