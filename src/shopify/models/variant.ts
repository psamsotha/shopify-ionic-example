
export interface IVariant {
  id: string;
  title: string;
  price: string;
  weight: string;
  available: boolean;
  compareAtPrice: string;
  image: {
    id: string;
    src: string;
    altText: string;
  };
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}
