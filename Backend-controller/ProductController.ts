import ProductsData from "@/Backend_Data/Products.json";

/**
 * Type for a product
 */
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
};

/**
 * Get a single product by its ID
 * @param id - The ID of the product
 * @returns The product object if found, otherwise undefined
 */
export const getProductById = (id: number): Product | undefined => {
  return ProductsData.find((product) => product.id === id);
};

/**
 * Get all products belonging to a specific category
 * @param category - The category name
 * @returns Array of products in the specified category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return ProductsData.filter((product) =>
    product.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Get all products
 * @returns A copy of all products to prevent direct mutation
 */
export const getAllProducts = (): Product[] => {
  return [...ProductsData];  // Returning a copy to prevent direct modification
};
