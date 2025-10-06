import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import {useRouter} from 'expo-router'

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const handleLogout = async () => {
    try{
        await signOut(auth);
        router.replace('/Auth/Login')
    }
    catch(error){
        console.log("sign out error", error);
        Alert.alert("Error signing out");
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.styleIcons}>
            <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
                <Ionicons name="log-out-outline" size={24} color="black" onPress={handleLogout} />
            </TouchableOpacity>

        </View>
      <Text style={styles.header}>Profile Screen</Text>
      <View style={styles.centerContent}>
        <Text style={styles.greeting}>Hi User</Text>
        <Text style={styles.emailLabel}>Email:</Text>
        <Text style={styles.emailValue}>{user ? user.email : "Not logged in"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f6e6e6",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#b76e79",
  },
  centerContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#b76e79",
  },
  emailLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    color: "#888",
  },
  emailValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
    color: "#333",
  },
  styleIcons: {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  paddingHorizontal: 20,
  marginTop: 20,
  gap: 26,
},
});