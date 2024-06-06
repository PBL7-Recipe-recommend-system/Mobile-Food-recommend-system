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

export const toDate = (input) => {
  if (input) {
    let parts = input.split("-");
    let dateObject = new Date(parts[2], parts[1] - 1, parts[0]); // month is zero-based
    return dateObject;
  }
};

export const getValueDropDownItem = (input, dataItems) => {
  return dataItems.find((item) => item.value === input).value;
};

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export const formatWaterValue = (water) => {
  if (water) {
    const isInteger = Number.isInteger(water);
    return isInteger ? `${water}.0` : water.toString();
  }
};

export const isToday = (date) => {
  const today = new Date();
  const givenDate = new Date(date);

  return (
    givenDate.getDate() === today.getDate() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getFullYear() === today.getFullYear()
  );
};

export const getProgress = (value, total) => {
  console.log("value", value);
  console.log("total", total);
  const progress = (value / total) * 100;
  return progress;
};
