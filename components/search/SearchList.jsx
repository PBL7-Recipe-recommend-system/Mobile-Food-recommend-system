import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Chase } from "react-native-animated-spinkit";
import { searchRecipes } from "../../api/search";
import RESULT_IMAGE from "../../assets/images/no-results.jpg";
import { getSearchOption } from "../../utils/asyncStorageUtils";
import { SearchItem } from "./SearchItem";
import { FAB } from "react-native-paper";
const groupItems = (items) => {
  if (!items) {
    return [];
  }

  const grouped = [];
  for (let i = 0; i < items.length; i += 2) {
    grouped.push(items.slice(i, i + 2));
  }
  return grouped;
};

export const SearchList = ({
  isSearching,
  dataSource,
  isLoading,
  position,
}) => {
  const [groupedData, setGroupedData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const hasChecked = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const searchPosition = 180 * 10 * page - 800 * page;
      if (!hasChecked.current && position > searchPosition) {
        hasChecked.current = true;
        setIsLoadingLoadMore(true);
        setPage((prevPage) => prevPage + 1);
        const searchOption = await getSearchOption();
        const { name, time, rate, category, minCalories, maxCalories } =
          searchOption;
        if (name.length !== 0) {
          setIsLoadingLoadMore(true);
          setTimeout(async () => {
            const results = await searchRecipes(
              name,
              time,
              rate,
              category,
              minCalories,
              maxCalories,
              page + 1
            );
            hasChecked.current = false;
            const newGroupedData = groupItems(results.data.content);
            setGroupedData((prevGroupedData) => [
              ...prevGroupedData,
              ...newGroupedData,
            ]);
          }, 500);
          setIsLoadingLoadMore(false);
        }
      }
    };
    fetchData();
  }, [position]);

  useEffect(() => {
    setGroupedData(groupItems(dataSource));
    hasChecked.current = false;
    setPage(1);
  }, [dataSource]);

  const renderLoader = () => {
    return isLoadingLoadMore ? (
      <ActivityIndicator size="large" color="#aaa" />
    ) : null;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <View style={styles.itemContainer}>
          <SearchItem data={item[0]} />
        </View>
        {item[1] && (
          <View style={styles.itemContainer}>
            <SearchItem data={item[1]} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <Text className="text-xl font-bold">
        {isSearching === false ? "Recent search" : "Result Search"}
      </Text>
      {isLoading === true ? (
        <View
          style={{
            flex: 1,
            marginVertical: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Chase size={48} color="#000" />
          <Text className="mt-1 font-bold">Loading...</Text>
        </View>
      ) : groupedData.length !== 0 ? (
        <FlatList
          data={groupedData}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={(item, index) => `row-${index}`}
          contentContainerStyle={styles.container}
          onEndReachedThreshold={0}
          ListFooterComponent={isLoadingLoadMore ? renderLoader : null}
        />
      ) : (
        <View
          style={{
            marginVertical: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={RESULT_IMAGE} style={styles.contain} size="lg" />
          <Text className="text-lg font-bold">No results...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  itemContainer: {
    width: "48%",
    aspectRatio: 1,
  },
  contain: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 16,
    alignItems: "center",
  },
});
