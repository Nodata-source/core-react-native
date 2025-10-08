import Constants from "expo-constants";
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function NotificationsPage() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    async function registerForPushNotifications() {
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

      // Pass projectId explicitly here
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.projectId,
      });
      setExpoPushToken(tokenData.data);

      // Send token to backend
      await fetch('http://192.168.1.119:3000/api/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenData.data }),
      });
    }

    registerForPushNotifications();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
      <Text>Expo Token</Text>
      <Text>{expoPushToken}</Text>
    </View>
  );
}