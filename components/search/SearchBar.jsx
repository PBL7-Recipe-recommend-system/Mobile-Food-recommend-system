import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/color";
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { FilterSearch } from "./FilterSearch";
import { searchRecipes, recentSearch } from "../../api/search";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const SearchBar = ({
  toggleSearchBar,
  activeSearch,
  onOpen,
  onClose,
  setIsSearching,
  setDataSearch,
  setIsLoading,
  isSearching,
}) => {
  const [value, setValue] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const inputRef = useRef();
  const refRBSheet = useRef();

  useEffect(() => {
    setValue("");
  }, [activeSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await recentSearch();
      setDataSearch(results.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (value.length !== 0) {
        setIsLoading(true);
        const results = await searchRecipes(value);
        setResultSearch(results.data.content);
        setDataSearch(results.data.content);
        setIsLoading(false);
      } else if (value.length === 0 || value === undefined) {
        if (!isSearching) {
          const results = await recentSearch();
          setResultSearch(results.data.content);
        }
        setResultSearch([]);
        setDataSearch([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSearch = async (text) => {
    if (text !== null && text !== "" && text !== undefined) {
      setIsSearching(true, async () => {
        await AsyncStorage.setItem("isSearching", JSON.stringify(true));
      });
    } else {
      setIsSearching(false, async () => {
        await AsyncStorage.setItem("isSearching", JSON.stringify(false));
      });
    }
    setValue(text);
  };

  const handlePress = () => {
    if (!activeSearch) {
      toggleSearchBar();
      inputRef.current.focus();
    }
  };

  return (
    <View style={style.searchContainer}>
      <TouchableOpacity
        style={{
          width: "80%",
          marginVertical: 24,
        }}
        onPress={handlePress}
      >
        <View
          style={{
            borderWidth: 2,
            borderRadius: 14,
            borderColor: "#E5E5E5",
            width: "100%",
            height: 50,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginLeft: 10,
            }}
          >
            <AntDesign name="search1" size={24} color="#E5E5E5" />
            <View style={{ width: "100%" }}>
              <TextInput
                ref={inputRef}
                editable
                numberOfLines={1}
                placeholder="Search recipe"
                maxLength={40}
                autoComplete="off"
                onChangeText={(text) => handleSearch(text)}
                value={value}
                height={46}
                style={{ paddingLeft: 10, width: "90%" }}
                onFocus={!activeSearch ? toggleSearchBar : null}
                showSoftInputOnFocus={activeSearch}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.filterButton]}
        onPress={() => refRBSheet.current.open()}
      >
        <Ionicons name="filter-outline" size={26} color="white" />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        onOpen={onOpen}
        onClose={onClose}
        useNativeDriver={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            height: "70%",
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <FilterSearch />
      </RBSheet>
    </View>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterSheet: {
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
});
