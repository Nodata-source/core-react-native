import {Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeTabs() {
    return (
    <Tabs>
        <Tabs.Screen name="dashboard" options={{title: "Dashboard", headerTitleAlign: "center", tabBarIcon: ()=> (<Ionicons name="home-outline" size={15} color="black"/>)}}/>
        <Tabs.Screen name="tasks" options={{title: "Tasks", headerTitleAlign: "center", tabBarIcon: ()=> (<Ionicons name="checkmark-outline" size={15} color="black"/>)}}/>
        <Tabs.Screen name="notifications" options={{title: "Notifications", headerTitleAlign: "center", tabBarIcon: ()=> (<Ionicons name="notifications-outline" size={15} color="black"/>)}}/>
        <Tabs.Screen name="profile" options={{title: "Profile", headerTitleAlign: "center", tabBarIcon: ()=> (<Ionicons name="person-outline" size={15} color="black"/>)}}/>
    </Tabs>
    )   
}