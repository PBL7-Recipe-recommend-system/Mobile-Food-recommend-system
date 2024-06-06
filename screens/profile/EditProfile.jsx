import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { me, setUpPersonalize, uploadAvatar } from "../../api/users";
import { BackButton } from "../../components/BackButton";
import { CustomDateTimePicker } from "../../components/CustomDateTimePicker";
import { CustomDropDown } from "../../components/CustomDropDown";
import { Loading } from "../../components/Loading";
import {
  ActivityList,
  GenderList,
  GoalList,
  MealsList,
} from "../../constants/HealthInputData";
import { PRIMARY_COLOR } from "../../constants/color";
import { getUserFromStorage } from "../../utils/asyncStorageUtils";
import AppWrapper from "../../wrappers/AppWrapper";
export const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [userData, setUserData] = useState({});

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadAvatar(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserFromStorage();
      const userFormat = {
        name: user.name,
        gender: user.gender,
        height: user.height.toString(),
        weight: user.weight.toString(),
        meals: user.meals,
        birthday: user.birthday,
        goal: user.dietaryGoal,
        exercises: user.dailyActivities,
      };
      setUserData(userFormat);
      reset(userFormat);
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await setUpPersonalize(data);
      await me();
      setIsChange(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppWrapper>
      <Loading loading={loading} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <BackButton />
          </View>
          <Text style={styles.textHeader}>Profile</Text>
          <TouchableOpacity
            style={styles.saveButton}
            disabled={!isChange}
            onPress={handleSubmit(onSubmit)}
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
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: "120%",
          }}
        >
          <TouchableWithoutFeedback
            onPress={
              showPicker
                ? () => {
                    setShowPicker(false);
                  }
                : null
            }
          >
            <View>
              <View style={styles.profileSection}>
                <Image
                  source={require("../../assets/mock/avatar.jpg")}
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editButton} onPress={pickImage}>
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
                        onBlur={onBlur}
                        onChangeText={(value) => {
                          onChange(value);
                          setIsChange(true);
                        }}
                        value={value}
                        style={styles.textInput}
                        {...register("name")}
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
                    <View style={{ zIndex: 10000 }}>
                      <Text style={styles.textLabel}>Gender</Text>
                      <CustomDropDown
                        dataItems={GenderList}
                        defaultValue={userData.gender}
                        setDefaultValue={(value) => {
                          setUserData({ ...userData, gender: value });
                          setIsChange(true);
                          onChange(value);
                        }}
                      />
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
                      <CustomDateTimePicker
                        showPicker={showPicker}
                        setShowPicker={setShowPicker}
                        defaultValue={userData.birthday}
                        setDefaultValue={(value) => {
                          setUserData({ ...userData, birthday: value });
                          setIsChange(true);
                          onChange(value);
                        }}
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
                            onBlur={onBlur}
                            onChangeText={(value) => {
                              onChange(value);
                              setIsChange(true);
                            }}
                            inputMode="numeric"
                            value={value}
                            style={[styles.textInput, { width: "70%" }]}
                            {...register("height")}
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
                            keyboardType="numeric"
                            onBlur={onBlur}
                            onChangeText={(value) => {
                              onChange(value);
                              setIsChange(true);
                            }}
                            value={value}
                            style={[styles.textInput, { width: "70%" }]}
                            {...register("weight")}
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
                          <CustomDropDown
                            direction={"TOP"}
                            dataItems={MealsList}
                            defaultValue={userData.meals}
                            setDefaultValue={(value) => {
                              setUserData({ ...userData, meals: value });
                              setIsChange(true);
                              onChange(value);
                            }}
                          />
                        </View>
                      )}
                      name="meals"
                    />
                  </View>
                </View>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ zIndex: 10001 }}>
                      <Text style={styles.textLabel}>Diet goal</Text>
                      <CustomDropDown
                        dataItems={GoalList}
                        defaultValue={userData.goal}
                        setDefaultValue={(value) => {
                          setUserData({ ...userData, goal: value });
                          onChange(value);
                          setIsChange(true);
                        }}
                      />
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
                    <View style={{ zIndex: 10002 }}>
                      <Text style={styles.textLabel}>Daily exercises</Text>
                      <CustomDropDown
                        dataItems={ActivityList}
                        defaultValue={userData.exercises}
                        setDefaultValue={(value) => {
                          setUserData({ ...userData, exercises: value });
                          setIsChange(true);
                          onChange(value);
                        }}
                      />
                    </View>
                  )}
                  name="exercises"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
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
    marginBottom: 0,
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
  saveButton: {
    position: "absolute",
    right: 0,
  },
  disabledButton: {
    position: "absolute",
    right: 0,
    color: "#A9A9A9",
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
    paddingHorizontal: 10,
    paddingVertical: 13,
  },
});
