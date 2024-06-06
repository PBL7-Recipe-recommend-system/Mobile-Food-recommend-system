import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { PRIMARY_COLOR } from "../../constants/color";
import { TrackingItemContent } from "./TrackingItemContent";
import { TrackingItemTitle } from "./TrackingItemTitle";
import { AntDesign } from "@expo/vector-icons";
export const TrackingItem = ({ data, title }) => {
  return (
    <View style={style.container}>
      <List.Accordion
        children={TrackingItemContent}
        style={{
          width: "100%",
          borderRadius: 12,
          backgroundColor: "white",
          flex: 1,
        }}
        left={(props) => (
          <View>
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
                {data !== null && (
                  <AntDesign name="checkcircleo" size={24} color="#00FF00" />
                )}
              </View>
              <Text
                style={{
                  color: "#9DA8C3",
                  fontSize: 16,
                }}
              >
                {data && data !== null ? data?.calories : "0"} Kcal
              </Text>
            </View>
          </View>
        )}
      >
        {data && data !== null ? (
          <List.Item
            title={<TrackingItemTitle data={data} />}
            description={<TrackingItemContent data={data} />}
            style={style.item}
          />
        ) : (
          <List.Item
            title={"You haven't eaten anything yet"}
            style={style.item}
          />
        )}
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
  },
  item: {
    borderBottomRightRadius: 12,
    padding: 0,
    margin: 0,
    alignSelf: "flex-start",
  },
});
