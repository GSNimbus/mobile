import {
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  KeyboardType,
} from "react-native";
import { styles } from "../../styles/styles";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

interface InputLabelProps {
  title: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  show?: boolean;
  onPress?: () => void;
  secure?: boolean;
  isSearched?: boolean;
  clearSearch?: () => void;
  keyboardType?: KeyboardType;
  inputDisabled?: boolean;
}

export default function InputLabel(props: InputLabelProps) {
  return (
    <View>
      <Text style={[styles.TextInput, { fontSize: 20, paddingVertical: 5 }]}>
        {props.title}
      </Text>
      <View
        style={[
          styles.Input,
          {
            justifyContent: "space-between",
            backgroundColor: props.inputDisabled ? "#7b8899" : "#ffffff",
          },
        ]}
      >
        <TextInput
          editable={!props.inputDisabled}
          secureTextEntry={props.secure}
          style={{ flex: 1 }}
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          placeholderTextColor={"#8B8B8B"}
          value={props.value}
          autoCapitalize="none"
          onChangeText={(text) => {
            if (props.keyboardType === "numeric") {
              // mantém só dígitos
              props.setValue(text.replace(/[^0-9]/g, ""));
            } else {
              props.setValue(text);
            }
          }}
        />
        {props.show ? (
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
              minWidth: props.isSearched ? 60 : 30,
              paddingHorizontal: 4,
            }}
            onPress={props.onPress}
          >
            <FontAwesome name="search" size={20} color="#5C7FA2" />
            {props.isSearched ? (
              <MaterialIcons
                name="clear"
                size={24}
                color="red"
                onPress={props.clearSearch}
              />
            ) : null}
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
