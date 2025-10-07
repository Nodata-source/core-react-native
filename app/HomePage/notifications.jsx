import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import * as Notifications from 'expo-notifications'
// import * as permissions from 'expo-permissions';
export default function NotificationsPage() {

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(()=> {
    async function registerForPushNotifications(){
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token!');
        return;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken(tokenData.data);

      // Send token to backend
      await fetch('https://your-backend.com/api/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenData.data }),
      });
    }

    registerForPushNotifications();
    
  },[]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
      <Text>Expo Token</Text>
      <Text>{expoPushToken}</Text>
    </View>
  );
}