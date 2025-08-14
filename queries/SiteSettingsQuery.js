import { gql } from "@apollo/client";
import { getWpUrl } from "@faustwp/core";

export const SITE_DATA_QUERY = gql`
  query GetSiteData {
    generalSettings {
      title
      description
    }
  }
`;

export async function fetchSiteIconUrl() {
  try {
    const wpUrl = getWpUrl();
    const response = await fetch(`${wpUrl}/wp-json`);
    if (!response.ok) return null;
    const data = await response.json();
    return data?.site_icon_url ?? null;
  } catch (e) {
    return null;
  }
}
