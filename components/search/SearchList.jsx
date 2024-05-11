import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text, Image } from "react-native";
import { SearchItem } from "./SearchItem";
import { Chase } from "react-native-animated-spinkit";
import RESULT_IMAGE from "../../assets/images/no-results.jpg";
import { recentSearch } from "../../api/search";
const groupItems = (items) => {
  const grouped = [];
  for (let i = 0; i < items.length; i += 2) {
    grouped.push(items.slice(i, i + 2));
  }
  return grouped;
};

export const SearchList = ({ isSearching, dataSource, isLoading }) => {
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let results;
      if (dataSource && dataSource.length > 0) {
        results = dataSource;
      } else {
        const response = await recentSearch();
        results = response.data;
      }
      setGroupedData(groupItems(results));
    };

    fetchData();
  }, [dataSource]);

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
          <Image source={RESULT_IMAGE} style={styles.contain} size="lg" con />
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
  },
});
