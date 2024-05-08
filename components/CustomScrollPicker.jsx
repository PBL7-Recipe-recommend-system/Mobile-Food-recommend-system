import React from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { ScrollView, Text, View, Platform } from "react-native";

export const CustomScrollPicker = ({
  dataSource,
  selectedIndex,
  onValueChange,
  width,
}) => {
  const ref = React.useRef();
  const [index, setIndex] = React.useState(0);
  // const onValueChange = (data, selectedIndex) => {
  //   setIndex(selectedIndex);
  // };

  const onNext = () => {
    if (index === dataSource.length - 1) return;
    setIndex(index + 1);
    ref.current && ref.current.scrollToTargetIndex(index + 1);
  };
  return (
    <ScrollPicker
      dataSource={dataSource}
      selectedIndex={selectedIndex}
      renderItem={(data, index) => {
        return (
          <View
            style={{
              width: width || 80,
            }}
          >
            <Text
              className="text-center"
              style={Platform.OS === "ios" && { fontSize: 20 }}
            >
              {data}
            </Text>
          </View>
        );
      }}
      onValueChange={(data, selectedIndex) => {
        onValueChange(data);
      }}
      wrapperHeight={160}
      itemHeight={52}
      highlightColor="#ccc"
      highlightBorderWidth={2}
      wrapperBackground="transparent"
    />
  );
};
