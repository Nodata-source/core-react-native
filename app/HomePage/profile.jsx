import { View, Text, StyleSheet } from "react-native";
export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <View style={styles.centerContent}>
        <Text>Hi User</Text>
        <Text>Email</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    width: "90%",
  },
});