import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getTokenFromAsyncStorage } from "~/helper/Auth";
const Authenticate = ({ children }) => {
  const [token, setToken] = useState();
  // const { navigate } = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      setToken(await getTokenFromAsyncStorage());
    };
    getToken();
  }, []);
  return <>{children}</>;
};

export default Authenticate;
