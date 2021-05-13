import gql from 'graphql-tag';

import { productByVendorQuery }  from './product-by-vendor.query';
import { ProductFragment } from './product.fragment';
import { VariantFragment } from './variant.fragment';


const fragments = [ProductFragment, VariantFragment].join('');


export const PRODUCT_BY_VENDOR_QUERY = gql`
  ${productByVendorQuery}
  ${fragments}
`;
