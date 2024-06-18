import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppWrapper from "../../wrappers/AppWrapper";
import { CustomHeader } from "../../components/search/CustomHeader";
import AutocompleteInput from "react-native-autocomplete-input";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/color";
import { IngredientsTab } from "./IngredientsTab";
import { set } from "react-hook-form";
import { INCLUDE_TAB } from "../../constants/plan";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { Card, Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { SearchIngredientModal } from "./SearchIngredientModal";
export const Ingredients = () => {
  const [tabValue, setTabValue] = useState(INCLUDE_TAB);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <AppWrapper>
      <View style={style.container}>
        <CustomHeader title="Ingredients" />
        <View className="mb-4">
          <IngredientsTab tabValue={tabValue} handleChangeTab={setTabValue} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Searchbar
            placeholder="Search Ingredients"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{
              width: "80%",
              borderWidth: 2,
              borderRadius: 14,
              borderColor: "#E5E5E5",
              backgroundColor: "#fff",
            }}
          />
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{
              backgroundColor: SECONDARY_COLOR,
              borderRadius: 10,
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            className="shadow-inner"
          >
            <Text
              className="text-2xl font-bold text-center "
              style={{ color: PRIMARY_COLOR }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={style.listView}>
        <Card
          style={{
            marginVertical: 8,
          }}
        >
          <Card.Actions>
            <Text className="left-3 absolute text-lg ">Egg</Text>
            <Button style={{ backgroundColor: "red", borderWidth: 0 }}>
              <FontAwesome5 name="trash-alt" size={20} color="white" />
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
      <SearchIngredientModal
        visible={showModal}
        hideModal={() => setShowModal(false)}
      />
    </AppWrapper>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 10,
  },
  listView: {
    marginHorizontal: 30,
  },
});
