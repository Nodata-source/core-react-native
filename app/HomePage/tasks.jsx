import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {

    const router = useRouter();
   return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks Dashboard</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/TasksDetails/taskListPage")}
      >
        <Text>View Task List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/TasksDetails/taskDetailsPage")}
      >
        <Text>Task Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/TasksDetails/editTask")}
      >
        <Text>Edit Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  button: {
    backgroundColor: "#e5a0a0ff",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
});
