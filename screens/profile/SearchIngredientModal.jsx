import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";
import { Button, Chip, Dialog } from "react-native-paper";
import { PRIMARY_COLOR, THIRD_COLOR } from "../../constants/color";
import { searchIngredient } from "../../api/ingredients";

export const SearchIngredientModal = ({
  visible,
  hideModal,
  handleAddIngredient,
}) => {
  const [query, setQuery] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isResults, setIsResults] = useState(false);

  let debounceTimeout = null;

  const handleSearch = (text) => {
    setQuery(text);
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      const res = await searchIngredient(text.toLowerCase());
      setFilteredData(res.data);
    }, 500);
  };

  const handleAdd = () => {
    handleAddIngredient(selectedData);
    setFilteredData([]);
    setSelectedData([]);
    setQuery("");
    hideModal();
  };

  const closeModal = () => {
    setFilteredData([]);
    setSelectedData([]);
    setQuery("");
    hideModal();
  };
  return (
    <Dialog
      visible={visible}
      onDismiss={hideModal}
      style={style.containerStyle}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Dialog.Title
          style={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Choose Ingredients
        </Dialog.Title>
        <AutocompleteInput
          style={{
            fontSize: 18,
          }}
          data={filteredData}
          placeholder="Search Ingredients"
          value={query}
          containerStyle={{
            borderWidth: 0,
          }}
          inputContainerStyle={[
            {
              borderWidth: 2,
              borderColor: "#E5E5E5",
              paddingHorizontal: 10,
              borderRadius: 10,
              marginTop: 0,
              paddingVertical: 4,
            },
            isResults && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
          onChangeText={(text) => handleSearch(text)}
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => (
              <TouchableOpacity
                className="py-1 px-4"
                style={{
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderColor: "#E5E5E5",
                }}
                onPress={() => {
                  if (!selectedData.includes(item)) {
                    setSelectedData([...selectedData, item]);
                    setFilteredData([]);
                    setQuery("");
                  }
                }}
              >
                <Text className="text-[18px] my-2 ">{item}</Text>
              </TouchableOpacity>
            ),
            style: {
              borderWidth: 2,
              borderColor: "#E5E5E5",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingVertical: 4,
              maxHeight: 240,
            },
          }}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {selectedData.map((item, idx) => (
            <Chip
              key={idx}
              style={style.chip}
              onClose={() => {
                setSelectedData(selectedData.filter((data) => data !== item));
              }}
            >
              {item}
            </Chip>
          ))}
        </View>
        <Dialog.Actions
          style={{
            marginTop: 20,
          }}
        >
          <Button
            labelStyle={{ fontSize: 18, color: PRIMARY_COLOR }}
            onPress={closeModal}
          >
            Cancel
          </Button>
          <Button
            labelStyle={{ fontSize: 18, color: PRIMARY_COLOR }}
            onPress={handleAdd}
          >
            Add
          </Button>
        </Dialog.Actions>
      </KeyboardAvoidingView>
    </Dialog>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    marginHorizontal: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "relative",
    bottom: "20%",
  },
  chip: {
    marginVertical: 5,
    marginRight: 5,
    backgroundColor: THIRD_COLOR,
  },
});
