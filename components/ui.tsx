import React from "react";
import { Pressable, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, padding: spacing.lg }}>{children}</View>
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{
      backgroundColor: colors.surface, borderRadius: 16, padding: spacing.lg,
      borderWidth: 1, borderColor: colors.border, shadowColor: "#000",
      shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
    }, style]}>
      {children}
    </View>
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

export function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      placeholderTextColor="#9b9b9b"
      {...props}
      style={[{
        borderWidth: 1, borderColor: colors.border, borderRadius: 12,
        paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.surface, color: colors.text,
      }, props.style]}
    />
  );
}

export function Row({ children, gap = spacing.sm, wrap = false, style }: { children: React.ReactNode; gap?: number; wrap?: boolean; style?: ViewStyle }) {
  return <View style={[{ flexDirection: "row", gap, flexWrap: wrap ? "wrap" : "nowrap" }, style]}>{children}</View>;
}

export function Spacer({ h = spacing.md }: { h?: number }) {
  return <View style={{ height: h }} />;
}
