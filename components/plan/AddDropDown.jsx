import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { PRIMARY_COLOR } from "../../constants/color";
import { FoodItem } from "./FoodItem";
import { AddFoodItem } from "./AddFoodItem";
import { CUSTOM_TAB } from "../../constants/plan";
import { CustomFoodItem } from "./CustomFoodItem";

export const AddDropDown = ({ data, title }) => {
  return (
    <View style={style.container}>
      <List.Accordion
        children={FoodItem}
        style={{
          borderRadius: 12,
          backgroundColor: "white",
          borderBottomColor: "#E5E5E5",
        }}
        left={(props) => (
          <View style={{ width: "88%" }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "#4166F5",
                    marginRight: 6,
                    fontSize: 22,
                    fontWeight: "500",
                    marginBottom: 5,
                  }}
                >
                  {title.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        )}
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <React.Fragment key={index}>
              <List.Item
                key={index}
                title={
                  <CustomFoodItem
                    item={item}
                    planType={CUSTOM_TAB}
                    meal={title}
                  />
                }
              />
            </React.Fragment>
          ))}

        <>
          <List.Item
            description={<AddFoodItem title={title} />}
            descriptionStyle={{
              alignSelf: "center",
              textAlign: "center",
            }}
          />
        </>
      </List.Accordion>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 16,
    borderLeftWidth: 10,
    marginRight: 10,
    borderColor: PRIMARY_COLOR,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    borderBottomRightRadius: 12,
  },
});
