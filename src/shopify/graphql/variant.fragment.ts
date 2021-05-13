export const VariantFragment = `
fragment VariantFragment on ProductVariant {
  id
  title
  price
  weight
  available
  compareAtPrice
  image {
    id
    src
    altText
  }
  selectedOptions {
    name
    value
  }
}`;
