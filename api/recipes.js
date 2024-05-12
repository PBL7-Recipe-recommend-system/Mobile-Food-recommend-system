import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";
const RECIPE_ENDPOINT = endpoints.RECIPES;

export const getPopularRecipes = (page, size) => {
  return axiosClient.get(
    `${RECIPE_ENDPOINT}/popular?page=${page}&size=${size}`
  );
};
