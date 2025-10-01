export interface ProductModel {
  id: number; // la API usa números para id
  title: string;
  price: number;
  description: string;
  images: string[]; // notar plural "images"
  category?: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  slug?: string;
  creationAt?: string;
  updatedAt?: string;
}
