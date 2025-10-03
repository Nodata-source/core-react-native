import { Text, View, StyleSheet,TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
    const router = useRouter();
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
        <View style={styles.centerContent}>
            <Text>Hello</Text>
            <View style={styles.signupCard}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput placeholder="Enter your Email" style={styles.styleTextInput}/>
                <Text style={styles.label}>User Name</Text>
                <TextInput placeholder="Enter your Username" style={styles.styleTextInput}/>
                <Text style={styles.label}>Password</Text>
                <TextInput placeholder="Enter your Password" style={styles.styleTextInput}/>
            </View>
            <TouchableOpacity style={styles.signupButton} onPress={()=>router.push('/Auth/Login')}>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 15}}>Sign Up</Text>
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
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    },
    signupCard:{
        width: '90%',
        height: 'auto',
        alignItems: "flex-start",
        backgroundColor: "#c9e4dcff",
        padding: 10,
        borderRadius: 5,
        elevation: 10,
    },
    styleTextInput: {
        borderWidth: 1,
        width: '100%',
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
        borderRadius: 10
    },
    label : {
        fontSize: 15,


    }
})
