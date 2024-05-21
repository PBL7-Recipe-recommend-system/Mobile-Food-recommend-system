import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";
const RECIPE_ENDPOINT = endpoints.RECIPES;

export const getPopularRecipes = (page, size) => {
  return axiosClient.get(
    `${RECIPE_ENDPOINT}/popular?${
      page !== undefined ? `page=${page}` : `page=0`
    }${size !== undefined ? `&size=${size}` : `&size=10`}`
  );
};

export const getDetailedRecipes = (id) => {
  return axiosClient.get(
    `${RECIPE_ENDPOINT}?${id !== undefined ? `id=${id}` : ``}`
  );
};
