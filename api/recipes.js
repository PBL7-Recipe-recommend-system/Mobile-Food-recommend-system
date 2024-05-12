import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";
const RECIPE_ENDPOINT = endpoints.RECIPES;

export const searchRecipes = (page, size) => {
  return axiosClient.get(
    `${RECIPE_ENDPOINT}/get-popular?page=${page}&size=${size}`
  );
};
