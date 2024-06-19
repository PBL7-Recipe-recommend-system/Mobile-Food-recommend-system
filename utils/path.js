const IP_PATH_HOME = "192.168.1.36";
const IP_PATH_COMPANY = "10.0.11.81";

export const LOCAL_COMPANY_API_PATH = `http://10.0.11.81:8082/api/v1`;
export const LOCAL_HOME_API_PATH = "http://192.168.1.36:8082/api/v1";
export const LOCAL_RECOMMENDATION_API_PATH =
  "http://192.168.1.36:8085/recommend";
export const COMPANY_RECOMMENDATION_API_PATH =
  "http://10.0.11.81:8085/recommend";

export const MOCK_RECIPE_IMAGE =
  "https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/34/43/09/tZpmvkHRMqVDAtUTp7FQ_Pesto%2520Artichoke%2520Spinach%2520Lasagna_final%25203.jpg";

export const noAuthEndpoint = ["/authenticate", "/register"];

export const endpoints = {
  AUTH: "/auth",
  RECIPES: "/recipes",
  USERS: "/users",
  PLAN: "/meal-plans",
  SAVED_RECIPES: "/saved-recipe",
  TRACKING: "/tracking",
  INGREDIENTS: "/users/ingredients",
};
