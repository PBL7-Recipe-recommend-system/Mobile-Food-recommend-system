import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import CustomButton from "../CustomButton";
import { set } from "react-hook-form";
const RatingModal = ({ visible }) => {
  const [rate, setRate] = useState(0);
  const [open, setOpen] = useState(visible);
  const sendRating = (rating) => {
    setRate(rating);
  };
  useEffect(() => {
    setOpen(visible);
  }, [visible]);
  console.log("visible >>> ", visible);
  return (
    <Modal
      visible={visible}
      style={{
        backgroundColor: "white",
        width: "64%",
        height: "22%",
        borderRadius: 20,
      }}
    >
      <View className="flex flex-row items-center justify-center">
        <Text className="text-[18px] font-bold">Rate recipe</Text>
      </View>
      <AirbnbRating
        count={5}
        defaultRating={0}
        size={20}
        ratingColor="#ffad30"
        onFinishRating={sendRating}
      />
      <CustomButton
        title={"Rate"}
        customStyle={{
          width: "40%",
          height: "18%",
          marginTop: "5%",
          marginHorizontal: "auto",
        }}
        onPressButton={() => setOpen(false)}
      />
    </Modal>
  );
};

export default RatingModal;
