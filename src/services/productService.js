// services/productService.js
import { handleResponse } from "./utils";

export async function getProductList(searchTerm) {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/products?name_like=${
      searchTerm ? searchTerm : ""
    }`
  );

  return await handleResponse(response);
}

export async function getProduct(id) {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/products/${id}`
  );
  return await handleResponse(response);
}

export async function getFeaturedList() {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/featured_products`
  );
  return await handleResponse(response);
}
