import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

type Props = {};

export const SelectDropdown = ({
  data = [],
  onSelect = () => {},
  value = {},
}: Props) => {
  const [inData, setInData] = useState(data);
  const [showOption, setShowOption] = useState(false);

  const onSelectItem = (item) => {
    onSelect(item.name);
    setShowOption(!showOption);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyles}
        onPress={() => setShowOption(!showOption)}
        activeOpacity={0.7}
      >
        <Text>{!value ? "Seleccionar una opción" : value}</Text>
        <FontAwesome
          name={showOption ? "chevron-up" : "chevron-down"}
          size={14}
          color="#0E1545"
        />
      </TouchableOpacity>
      {showOption && (
        <View style={styles.dropDownGroup}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            scrollIndicatorInsets={{ top: 10, bottom: 10, left: 10, right: 10 }}
            indicatorStyle="black"
          >
            {inData.map((rol) => {
              return (
                <TouchableOpacity
                  key={rol.id}
                  onPress={() => onSelectItem(rol)}
                  style={{
                    ...styles.dropDownItem,
                    backgroundColor: rol.name === value ? "orange" : " orange",
                    marginBottom: 4,
                  }}
                >
                  <Text>{rol.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export const MultipleSelectDropdown = ({
  data = [],
  onSelect = () => {},
  values = [],
}: Props) => {
  const [inData, setInData] = useState(data);
  const [showOption, setShowOption] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [valuesSelected, setValuesSelected] = useState(values);
  const [showSelectedItems, setShowSelectedItems] = useState(values.length > 0);

  const onSelectItems = (item) => {
    setIsChange(!isChange);
    const index = valuesSelected.findIndex((value) => value.id === item.id);

    if (index !== -1) {
      valuesSelected.splice(index, 1);
    } else {
      valuesSelected.push(item);
    }

    setValuesSelected(valuesSelected);
  };

  const onCloseSelection = () => {
    onSelect(valuesSelected);
    setShowOption(!showOption);
  };

  useEffect(() => {}, [isChange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDownStyles}
        onPress={() => onCloseSelection()}
        activeOpacity={0.7}
      >
        <Text>{"Seleccionar hasta 4 opciones"}</Text>
        <FontAwesome
          name={showOption ? "chevron-up" : "plus-square-o"}
          size={18}
          color={COLORS.label}
        />
      </TouchableOpacity>

      {showOption && (
        <View style={styles.dropDownGroup}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            {inData.map((rol, i) => {
              return (
                <TouchableOpacity
                  key={rol.id}
                  onPress={() => {
                    onSelectItems(rol);
                  }}
                  style={styles.dropDownItems}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    {valuesSelected.some((val) => val.id == rol.id) ? (
                      <Ionicons
                        name="checkbox"
                        size={18}
                        color={COLORS.label}
                        style={{ marginRight: 5 }}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="checkbox-blank-outline"
                        size={18}
                        color="black"
                        style={{ marginRight: 5 }}
                      />
                    )}

                    <Text>{rol.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Donde se muestran los valores seleccionados */}
      {/* {showSelectedItems && ( */}
      <View style={styles.selectedGroup}>
        <Text> Estos son los valores seleccionados</Text>
        <Text> hay seleccionados ({valuesSelected.length})</Text>
        <View style={styles.itemsContainer}>
          {valuesSelected.map((value) => {
            return (
              <TouchableOpacity
                key={value.id}
                style={styles.selectedItems}
                onPress={() => onSelectItems(value)}
              >
                <Text style={styles.mr10}>{value.name}</Text>
                <FontAwesome name={"times"} size={14} color={COLORS.label} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  // estilos para el input select
  dropDownStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F7F6F5", // color del input select
    padding: 14,
    minHeight: 42,
    marginBottom: 2,
  },

  // estilos para los elementos a seleccionar
  dropDownGroup: {
    backgroundColor: "#E3E5FA",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 15,
    marginVertical: 4,
    maxHeight: 164,
  },

  // estilos para el elemento seleccionado
  dropDownItem: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 4,
  },
  // estilos para el elemento en la seleccion multiple
  dropDownItems: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 4,
    backgroundColor: COLORS.inputBg,
  },

  // estilos para el grupo seleccionado
  selectedGroup: {
    padding: 15,
    marginVertical: 4,
    backgroundColor: COLORS.grayLight,
  },
  // estilos para el elementos seleccionados e y mostrado abajo
  selectedItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 4,

    borderRadius: 10,
  },
  mr10: {
    marginRight: 10,
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginTop: 15,
  },
});
