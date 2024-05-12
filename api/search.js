import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";
const RECIPE_ENDPOINT = endpoints.RECIPES;

export const searchRecipes = (keyword) => {
  return axiosClient.get(`${RECIPE_ENDPOINT}/search?name=${keyword}`);
};

export const recentSearch = () => {
  return axiosClient.get(`${RECIPE_ENDPOINT}/recent`);
};
