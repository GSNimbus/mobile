import { View, Button, StyleSheet, Pressable, Text, ViewStyle } from "react-native";

interface ButtonAreaProps {
  title: string;
  action?: () => void;
  size: "small" | "medium" | "large";
  actionWithParameters?: (info : any) => any
  infoForActionWithParameters? : any
  additionalStyles? : ViewStyle
}

export default function Botao(props: ButtonAreaProps) {
  const sizeChooser = {
    small: 16,
    medium: 20,
    large: 28,
  };
  return (
    <Pressable
      onPress={() => props.action?.()}
    >
      <Text
        style={[{
          backgroundColor: "#5C7FA2",
          borderColor: "#5C7FA2",
          borderWidth: 3,
          color: "white",
          fontSize: sizeChooser[props.size],
          alignSelf: 'center',
          paddingHorizontal: 32,
          borderRadius: 36,
          paddingVertical: 12
        }, props.additionalStyles]}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}