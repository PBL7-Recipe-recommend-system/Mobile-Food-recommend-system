import React, { useEffect, useState } from "react";

import DropDownPicker from "react-native-dropdown-picker";

export const CustomDropDown = ({ dataItems }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (dataItems) {
      console.log(dataItems);
      setItems(dataItems);
    }
  }, [dataItems]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={5000}
      zIndexInverse={5000}
      style={{ borderColor: "#A9A9A9", borderWidth: 2 }}
      labelStyle={{ fontSize: 16, color: "#000" }}
      dropDownContainerStyle={{
        borderColor: "#A9A9A9",
        borderWidth: 2,
      }}
      itemProps={{
        style: {
          paddingVertical: 4,
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 10,
          alignItems: "center",
        },
      }}
      listItemLabelStyle={{
        fontSize: 16,
        marginVertical: 10,
        color: "#676767",
      }}
    />
  );
};
