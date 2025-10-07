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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSignUp = async () => {
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      userName.trim() === ""
    ) {
      Alert.alert("Enter All details");
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user registered successfully");
      Alert.alert("Signup Successful! Redirecting to Login");

      router.push("/Auth/Login");
    } catch (error) {
      console.error("Firebase Sign Up Error:", error.message);
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text>Hello</Text>
          <View style={styles.signupCard}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="Enter your Email"
              value={email.trim()}
              onChangeText={setEmail}
              style={styles.styleTextInput}
            />
            <Text style={styles.label}>User Name</Text>
            <TextInput
              placeholder="Enter your Username"
              value={userName.trim()}
              onChangeText={setUserName}
              style={styles.styleTextInput}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your Password"
              value={password.trim()}
              onChangeText={setPassword}
              style={styles.styleTextInput}
            />
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => router.push("/Auth/Login")}
          >
            <Text style={{ color: "#2b53f0ff" }}>
              Already have an account? Login
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
