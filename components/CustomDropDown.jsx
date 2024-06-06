import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export const CustomDropDown = ({
  dataItems,
  defaultValue,
  setDefaultValue,
  direction,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (dataItems) {
      setItems(dataItems);
    }
  }, [dataItems]);

  useEffect(() => {
    if (value) {
      if (defaultValue !== value) {
        setDefaultValue(value);
      }
    }
  }, [value]);

  return (
    <DropDownPicker
      open={open}
      value={value ? value : defaultValue}
      items={items}
      defaultValue={value}
      dropDownDirection={direction}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      zIndex={5000}
      zIndexInverse={5000}
      style={{ borderColor: "#A9A9A9", borderWidth: 2 }}
      containerStyle={{
        zIndex: open ? 1000 : 0,
      }}
      labelStyle={{ fontSize: 16, color: "#000" }}
      dropDownContainerStyle={{
        borderColor: "#A9A9A9",
        borderWidth: 2,
        zIndex: 50000000000,
        zIndexInverse: 5000000000000000,
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
