import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Register = () => {
  const navigation = useNavigation();

  const handleSwipeLeft = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSwipeLeft}>
        <Text>Swipe left to go back</Text>
      </TouchableOpacity>
      <Text>Register</Text>
    </View>
  );
};

export default Register;
