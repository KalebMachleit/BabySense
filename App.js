import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import HomeScreen from './pages/HomeScreen';
import AlertsScreen from './pages/AlertsScreen';
import * as Notifications from 'expo-notifications';
import TestNotification from './pages/TestNotification';




const Stack = createNativeStackNavigator();

export default function App() {
  // async function registerForPushNotificationsAsync() {
  //   let token;
  
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  
  //   if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   console.log(token);
  
  //   return token;
  // };

  // React.useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Alerts" component={AlertsScreen}/>
        <Stack.Screen name="TestNotifications" component={TestNotification}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


