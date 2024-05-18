import axiosClient from "../helper/http";
import { endpoints } from "../utils/path";
const RECIPE_ENDPOINT = endpoints.RECIPES;

export const searchRecipes = (keyword, time, rate, category, page) => {
  return axiosClient.get(
    `${RECIPE_ENDPOINT}/search?name=${keyword}${
      time !== null ? `&timeRate=${time}` : ""
    }${rate !== null ? `&rating=${rate}` : ""}${
      category !== null ? `&category=${category}` : ""
    }${page !== undefined ? `&page=${page}` : `&page=0`}&size=20`
  );
};

export const recentSearch = () => {
  return axiosClient.get(`${RECIPE_ENDPOINT}/recent`);
};
