import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { SearchItem } from "./SearchItem";
import { Chase } from "react-native-animated-spinkit";
import RESULT_IMAGE from "../../assets/images/no-results.jpg";
import { searchRecipes } from "../../api/search";
import AsyncStorage from "@react-native-async-storage/async-storage";
const groupItems = (items) => {
  const grouped = [];
  for (let i = 0; i < items.length; i += 2) {
    grouped.push(items.slice(i, i + 2));
  }
  return grouped;
};

export const SearchList = ({ isSearching, dataSource, isLoading }) => {
  const [groupedData, setGroupedData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);

  useEffect(() => {
    setGroupedData(groupItems(dataSource));
    setPage(0);
  }, [dataSource]);

  useEffect(() => {
    const fetchData = async () => {
      const searchOptionString =
        (await AsyncStorage.getItem("searchOption")) || {};
      const searchOption = searchOptionString
        ? JSON.parse(searchOptionString)
        : {};
      const { name, time, rate, category } = searchOption;
      if (name.length !== 0) {
        setIsLoadingLoadMore(true);
        setTimeout(async () => {
          const results = await searchRecipes(name, time, rate, category, page);
          const newGroupedData = groupItems(results.data.content);
          setGroupedData((prevGroupedData) => [
            ...prevGroupedData,
            ...newGroupedData,
          ]);
        }, 500);
        setIsLoadingLoadMore(false);
      }
    };
    fetchData();
  }, [page]);

  const renderLoader = () => {
    return isLoadingLoadMore ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
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

  const ListEndLoader = async () => {
    // setPage((prevPage) => prevPage + 1);
    console.log("end of list >> ", page + 1);
  };
  return (
    <View>
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
          onEndReached={ListEndLoader}
          onEndReachedThreshold={0}
          ListFooterComponent={renderLoader}
        />
      ) : (
        <View
          style={{
            flex: 1,
            marginVertical: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={RESULT_IMAGE} style={styles.contain} size="lg" />
          <Text className="text-lg font-bold">No results...</Text>
        </View>
      )}
      {isLoadingLoadMore ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : null}
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
