import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (email.trim() === "") {
      Alert.alert("Enter Email");
      return;
    }
    try {
      const userCredentials = await sendPasswordResetEmail(auth, email);
      console.log("Reset link sent!");
      Alert.alert("Reset link sent! Check your email.");

      router.push("/Auth/Login");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("No account found with this email.");
      } else {
        Alert.alert("Failed to send reset link.", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <View style={styles.signupCard}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
              style={styles.styleTextInput}
            />
          </View>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handlePasswordReset}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Send Reset Link
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signupCard: {
    width: "90%",
    height: "auto",
    alignItems: "flex-start",
    backgroundColor: "#c9e4dcff",
    padding: 10,
    borderRadius: 5,
    elevation: 10,
  },
  styleTextInput: {
    borderWidth: 1,
    width: "100%",
    height: "auto",
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 30,
    maxHeight: 50,
    padding: 10,
  },
  signupButton: {
    backgroundColor: "#2b53f0ff",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 15,
  },
});
