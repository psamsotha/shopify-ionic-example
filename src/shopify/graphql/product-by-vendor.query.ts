export const productByVendorQuery = `
query ProductsByVendor($vendorQuery: String!) {
  shop {
    products(first: 20, query: $vendorQuery) {
      pageInfo {
        hasNextPage,
        hasPreviousPage
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
}`;
