import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { CustomHeader } from "../../components/search/CustomHeader";
import AppWrapper from "../../wrappers/AppWrapper";
import { SearchBar } from "../../components/search/SearchBar";
import { SearchList } from "../../components/search/SearchList";
import { KeyboardWrapper } from "../../wrappers/KeyboardWrapper";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setMealAddingFromStorage,
  setMealAddingToStorage,
} from "../../utils/asyncStorageUtils";

export const Search = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const mealAdding = route.params.meal;
  useEffect(() => {
    const fetchData = async () => {
      await setMealAddingToStorage(mealAdding);
    };
    fetchData();
  }, []);

  return (
    <AppWrapper>
      <KeyboardWrapper>
        <View style={{ flex: 1 }}>
          <View
            style={[
              {
                paddingHorizontal: 30,
              },
            ]}
          >
            <CustomHeader title="Add meals to your plan" />
          </View>
          <SearchBar
            onOpen={() => setIsOverlayVisible(true)}
            onClose={() => setIsOverlayVisible(false)}
            isSearching={isSearching}
            setIsSearching={(value) => setIsSearching(value)}
            setDataSearch={(value) => setDataSearch(value)}
            setIsLoading={(value) => setIsLoading(value)}
            activeSearch={true}
          />
          <ScrollView
            contentContainerStyle={[
              {
                width: "100%",
                paddingHorizontal: 30,
              },
            ]}
          >
            <SearchList
              isSearching={isSearching}
              dataSource={dataSearch}
              isLoading={isLoading}
            />
          </ScrollView>
        </View>
      </KeyboardWrapper>
    </AppWrapper>
  );
};
