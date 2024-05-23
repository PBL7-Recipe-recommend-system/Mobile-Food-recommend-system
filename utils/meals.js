export const BREAKFAST = "Breakfast";
export const MORNING_SNACK = "Morning Snack";
export const LUNCH = "Lunch";
export const AFTERNOON_SNACK = "Afternoon Snack";
export const DINNER = "Dinner";

export const generateNumberOfMeals = (numberOfMeals) => {
  if (numberOfMeals === 3) {
    return [BREAKFAST, LUNCH, DINNER];
  }
  if (numberOfMeals === 4) {
    return [BREAKFAST, MORNING_SNACK, LUNCH, DINNER];
  }
  if (numberOfMeals === 5) {
    return [BREAKFAST, MORNING_SNACK, LUNCH, AFTERNOON_SNACK, DINNER];
  }
};
