import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SavedItem } from "./SavedItem";
import { getSavedRecipes, saveRecipe } from "../../api/saved-recipe";

export const SavedList = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSavedRecipes();
      setDataSource(res.data);
    };
    fetchData();
  }, []);

  const handleUnsaveItem = async (id) => {
    await saveRecipe(id, false);
    setDataSource(dataSource.filter((item) => item.recipeId !== id));
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {console.log(dataSource)}
      {dataSource.length > 0 &&
        dataSource.map((item, index) => (
          <SavedItem key={index} data={item} handleOnPress={handleUnsaveItem} />
        ))}
    </ScrollView>
  );
};
