import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  Icon,
  MD3Colors,
  Searchbar,
} from "react-native-paper";
import { Root, Toast } from "react-native-popup-confirm-toast";
import { ScrollView } from "react-native-virtualized-view";
import {
  addIngredients,
  getIngredientList,
  removeIngredients,
} from "../../api/ingredients";
import { getRecommendation } from "../../api/recommendation";
import { me } from "../../api/users";
import { BackButton } from "../../components/BackButton";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  THIRD_COLOR,
} from "../../constants/color";
import { INCLUDE_TAB } from "../../constants/plan";
import AppWrapper from "../../wrappers/AppWrapper";
import { IngredientsTab } from "./IngredientsTab";
import { SearchIngredientModal } from "./SearchIngredientModal";
export const Ingredients = () => {
  const [tabValue, setTabValue] = useState(INCLUDE_TAB);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getIngredientList(tabValue);
      setDataList(res.data);
    };
    fetchData();
  }, [tabValue]);

  const handleRemoveItem = async (item) => {
    await removeIngredients(tabValue, item);
    await me();
    setDataList(dataList.filter((data) => data !== item));
    setSearchData(searchData.filter((data) => data !== item));
    setIsChange(true);
  };

  const handleSearchIngredient = (name) => {
    setSearchQuery(name);
    setSearchData(
      dataList.filter((data) => data.toLowerCase().includes(name.toLowerCase()))
    );
  };

  const handleAddIngredient = async (data) => {
    const value = {
      ingredients: data,
    };
    await addIngredients(tabValue, value);
    await me();
    setDataList([...dataList, ...data]);
    setIsChange(true);
    Toast.show({
      title: "Success",
      text: "Ingredient added successfully!",
      backgroundColor: THIRD_COLOR,
      timeColor: PRIMARY_COLOR,
      timing: 1500,
      icon: <Icon name={"check"} color={"#fff"} size={31} />,
      position: "top",
    });
  };

  const handleSubmit = async () => {
    await getRecommendation();
  };
  return (
    <AppWrapper>
      <Root>
        <View style={style.container}>
          <View style={style.header}>
            <View style={style.backButton}>
              <BackButton />
            </View>
            <Text style={style.textHeader}>Ingredients</Text>
            <TouchableOpacity
              style={style.saveButton}
              disabled={!isChange}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  {
                    color: PRIMARY_COLOR,
                    fontSize: 18,
                    fontWeight: "600",
                  },
                  !isChange && { color: "#A9A9A9" },
                ]}
              >
                Reload
              </Text>
            </TouchableOpacity>
          </View>
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
              onChangeText={handleSearchIngredient}
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
        <HelperText
          type="info"
          visible={true}
          style={{
            marginHorizontal: 30,
            fontSize: 16,
            alignContent: "center",
          }}
        >
          <Icon
            source="information-outline"
            size={20}
            color={MD3Colors.neutralVariant30}
            style={{
              textAlign: "center",
            }}
          />{" "}
          You should press the reload button to get the new recommendation.
        </HelperText>
        <ScrollView contentContainerStyle={style.listView}>
          {(searchQuery === "" ? dataList : searchData) &&
            (searchQuery === "" ? dataList : searchData).map((item, index) => (
              <Card
                style={{
                  marginVertical: 8,
                }}
                key={index}
              >
                <Card.Actions>
                  <Text
                    className="left-3 absolute text-lg"
                    ellipsizeMode="tail"
                  >
                    {item.length > 27 ? item.substring(0, 27) + "..." : item}
                  </Text>
                  <Button
                    style={{ backgroundColor: "red", borderWidth: 0 }}
                    onPress={() => handleRemoveItem(item)}
                  >
                    <FontAwesome5 name="trash-alt" size={20} color="white" />
                  </Button>
                </Card.Actions>
              </Card>
            ))}
        </ScrollView>
        <SearchIngredientModal
          visible={showModal}
          hideModal={() => setShowModal(false)}
          handleAddIngredient={handleAddIngredient}
        />
      </Root>
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
  header: {
    marginVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  saveButton: {
    position: "absolute",
    right: 0,
  },
});
