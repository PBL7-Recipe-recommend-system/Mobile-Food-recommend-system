import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import AppWrapper from "../../wrappers/AppWrapper";
import { BackButton } from "../../components/BackButton";
export const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <AppWrapper>
      <View
        style={{
          marginHorizontal: 30,
        }}
      >
        <View style={styles.header}>
          <View style={styles.backButton}>
            <BackButton />
          </View>
          <Text style={styles.textHeader}>Change Password</Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <Text style={styles.textLabel}>Current Password</Text>
              <TextInput
                placeholder="Your name ..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            </View>
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <Text style={styles.textLabel}>New Password</Text>
              <TextInput
                placeholder="Your name ..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            </View>
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <Text style={styles.textLabel}>Confirm password</Text>
              <TextInput
                placeholder="Your name ..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
              />
            </View>
          )}
          name="name"
        />
        <CustomButton
          title={"Update"}
          width={"50%"}
          customStyle={{
            paddingVertical: 10,
            marginHorizontal: "auto",
            marginVertical: 20,
          }}
        />
      </View>
    </AppWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
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
  textLabel: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 4,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
  },
});
