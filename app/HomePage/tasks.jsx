import { View, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>tasks Screen</Text>
      <View style={styles.centerContent}>
        <View style={styles.searchBar}>
            <TextInput placeholder="Search"/>
        </View>
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
    alignItems: "center"
  }
});