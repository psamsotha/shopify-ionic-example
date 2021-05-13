import { IVariant } from "./variant";


export interface IImage {
  id: string;
  src: string;
  altText: string;
}

export interface IProduct {
  id: string;
  createdAt: string;
  updatedAt: string;
  descriptionHtml: string;
  description: string;
  handle: string;
  productType: string;
  title: string;
  vendor: string;
  tags: string;
  publishedAt: string;
  onlineStoreUrl: string;

  options: Array<{ name: string; values: string[]; }>;
  images: Array<IImage>;
  variants?: Array<IVariant>;
}


export interface IProductData {
  id: string;
  createdAt: string;
  updatedAt: string;
  descriptionHtml: string;
  description: string;
  handle: string;
  productType: string;
  title: string;
  vendor: string;
  tags: string;
  publishedAt: string;
  onlineStoreUrl: string;

  options: Array<{
    name: string;
    values: Array<string>;
  }>;
  
  images: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      cursor: any
      node: IImage
    }>;
  };

  variants: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      cursor: any;
      node: IVariant;
    }>
  }
}

export function cleanProductData(data: IProductData): IProduct {
  const product: IProduct = {
    id: data.id,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    descriptionHtml: data.descriptionHtml,
    description: data.description,
    handle: data.handle,
    productType: data.productType,
    title: data.title,
    vendor: data.vendor,
    tags: data.tags,
    publishedAt: data.publishedAt,
    onlineStoreUrl: data.onlineStoreUrl,
 
    options: data.options,
    images: data.images.edges.map(edge => edge.node),
  };
  // some product variants don't have images,
  // e.g. hats, which we will just use the
  // default product image
  product.variants = data.variants.edges
    .map(edge => edge.node)
    .map(variant => {  
     if (!!variant.image) {
        return variant;      
      } else {
        return Object.assign({}, variant, { image: product.images[0] });
      }
    });
  
  return product;
}