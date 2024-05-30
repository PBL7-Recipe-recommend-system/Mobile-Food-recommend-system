import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-virtualized-view";
import { BackButton } from "../../components/BackButton";
import AppWrapper from "../../wrappers/AppWrapper";
import CustomButton from "../../components/CustomButton";
import { CustomDropDown } from "../../components/CustomDropDown";
import {
  ActivityList,
  GenderList,
  GoalList,
} from "../../constants/HealthInputData";

export const EditProfile = () => {
  const [open, setOpen] = useState(false);
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
  return (
    <AppWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <BackButton />
          </View>
          <Text style={styles.textHeader}>Profile</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: "130%",
          }}
        >
          <View style={styles.profileSection}>
            <Image
              source={require("../../assets/mock/avatar.jpg")}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Upload Avatar</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={{
                    marginVertical: 4,
                  }}
                >
                  <Text style={styles.textLabel}>Name</Text>
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
                <View>
                  <Text style={styles.textLabel}>Gender</Text>
                  <CustomDropDown dataItems={GenderList} />
                </View>
              )}
              name="gender"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={{
                    marginVertical: 4,
                  }}
                >
                  <Text style={styles.textLabel}>Birthday</Text>
                  <TextInput
                    placeholder="Your Birthday ..."
                    onBlur={onBlur}
                    onFocus={() => setOpen(true)}
                    onChangeText={onChange}
                    value={value}
                    style={styles.textInput}
                  />
                </View>
              )}
              name="birthday"
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <View style={{ width: "50%" }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={{
                        marginVertical: 4,
                      }}
                    >
                      <Text style={styles.textLabel}>Height</Text>
                      <TextInput
                        placeholder="Your Height ..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.textInput, { width: "70%" }]}
                      />
                    </View>
                  )}
                  name="height"
                />
              </View>
              <View style={{ width: "50%" }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={{
                        marginVertical: 4,
                      }}
                    >
                      <Text style={styles.textLabel}>Weight</Text>
                      <TextInput
                        placeholder="Your Height ..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.textInput, { width: "70%" }]}
                      />
                    </View>
                  )}
                  name="weight"
                />
              </View>
              <View style={{ width: "50%" }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={{
                        marginVertical: 4,
                      }}
                    >
                      <Text style={styles.textLabel}>Meals per day</Text>
                      <TextInput
                        placeholder="Your Height ..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={[styles.textInput, { width: "70%" }]}
                      />
                    </View>
                  )}
                  name="weight"
                />
              </View>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={styles.textLabel}>Diet goal</Text>
                  <CustomDropDown dataItems={GoalList} />
                </View>
              )}
              name="goal"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text style={styles.textLabel}>Daily exercises</Text>
                  <CustomDropDown dataItems={ActivityList} />
                </View>
              )}
              name="exercises"
            />
          </View>
          <CustomButton
            title={"Update"}
            width={"50%"}
            customStyle={{
              paddingVertical: 10,
              marginHorizontal: "auto",
              marginVertical: 20,
            }}
          />
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  item: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
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
