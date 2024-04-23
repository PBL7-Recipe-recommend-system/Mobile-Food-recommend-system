import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 30,
    alignItems: "flex-start",
  },
  input: {
    minWidth: "100%",
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D9D9D9",
  },
  errorInput: {
    minWidth: "100%",
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
  },
});
