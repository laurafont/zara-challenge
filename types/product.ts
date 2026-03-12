export type ProductSpecs = Record<string, string>;

export interface ProductColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface ProductStorageOption {
  capacity: string;
  price: number;
}

export interface BaseProductProps {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export type SimilarProduct = BaseProductProps;

export interface ProductDetailProps extends BaseProductProps {
  description: string;
  specs: ProductSpecs;
  colorOptions: ProductColorOption[];
  storageOptions: ProductStorageOption[];
  similarProducts: SimilarProduct[];
}

export type ProductProps = BaseProductProps;
