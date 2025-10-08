import React from "react";
import { View, Text, Pressable, TextInput, ViewStyle, TextStyle } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.bg }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ padding: spacing.lg, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{
      backgroundColor: colors.surface, borderRadius: 16, padding: spacing.lg,
      borderWidth: 1, borderColor: colors.border, shadowColor: "#000",
      shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
    }, style]}>{children}</View>
  );
}
export function Title({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  return <Text style={[{ fontSize: 24, fontWeight: "800", color: colors.text }, style]}>{children}</Text>;
}
export function Subtitle({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontSize: 14, color: colors.subtext }}>{children}</Text>;
}
export function Button({
  children, onPress, variant = "primary", full = false,
}: { children: React.ReactNode; onPress?: () => void; variant?: "primary"|"accent"|"ghost"; full?: boolean; }) {
  const bg = variant === "primary" ? colors.primary : variant === "accent" ? colors.accent : "transparent";
  const color = variant === "ghost" ? colors.primary : "#fff";
  const borderColor = variant === "ghost" ? colors.primary : "transparent";
  return (
    <Pressable onPress={onPress} style={{
      backgroundColor: bg, paddingVertical: 12, paddingHorizontal: 16,
      borderRadius: 14, alignItems: "center", borderWidth: 1, borderColor,
      width: full ? "100%" : undefined,
    }}>
      <Text style={{ color, fontWeight: "800" }}>{children}</Text>
    </Pressable>
  );
}
export const Input = React.forwardRef<TextInput, React.ComponentProps<typeof TextInput>>(
  (props, ref) => {
    return (
      <TextInput
        ref={ref}
        placeholderTextColor="#9b9b9b"
        {...props}
        style={[
          {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 14,
            backgroundColor: colors.surface,
            color: colors.text,
          },
          props.style,
        ]}
      />
    );
  }
);
Input.displayName = "Input";

export function Row({ children, gap = spacing.sm, wrap = false, style }: { children: React.ReactNode; gap?: number; wrap?: boolean; style?: ViewStyle }) {
  return <View style={[{ flexDirection: "row", gap, flexWrap: wrap ? "wrap" : "nowrap" }, style]}>{children}</View>;
}
export function Spacer({ h = spacing.md }: { h?: number }) { return <View style={{ height: h }} />; }
