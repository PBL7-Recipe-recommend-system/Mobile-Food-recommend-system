import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../constants/color";
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { FilterSearch } from "./FilterSearch";
export const SearchBar = ({
  navigation,
  toggleSearchBar,
  activeSearch,
  onOpen,
  onClose,
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const refRBSheet = useRef();
  return (
    <View style={style.searchContainer}>
      <TouchableOpacity
        style={{
          width: "80%",
          marginVertical: 24,
        }}
        onPress={toggleSearchBar}
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
                onChangeText={(text) => setValue(text)}
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
