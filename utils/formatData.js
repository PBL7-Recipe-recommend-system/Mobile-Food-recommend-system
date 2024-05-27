export const formatRecommend = (data) => {
  const formattedData = { ...data };
  formattedData.recommendations = data.recommendations.map((recommendation) => {
    const newRecommendation = { ...recommendation };
    for (const mealType in recommendation.meals) {
      newRecommendation.meals[mealType] = recommendation.meals[mealType].map(
        (meal) => {
          const { recipeId, ...rest } = meal;
          return { id: recipeId, ...rest };
        }
      );
    }
    return newRecommendation;
  });
  return formattedData;
};

export const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
};

export const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
};

export const getGoal = (goal) => {
  if (goal === 1) {
    return "Lose weight";
  }
  if (goal === 2) {
    return "Gain weight";
  }
  if (goal === 3) {
    return "Maintain weight";
  }
};
