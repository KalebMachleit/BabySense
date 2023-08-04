import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import HomeScreen from './pages/HomeScreen';
import AlertsScreen from './pages/AlertsScreen';
import * as Notifications from 'expo-notifications';
import TestNotification from './pages/TestNotification';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useInterval from './polling/useInterval';
import { createContext, useEffect, useState, useRef } from "react";
import useNotificationData from './hooks/useNotificationData';
import * as Device from 'expo-device';
import NotifScreen from './pages/NotifScreen';

export const NotifContext = createContext();

let sensorData = []
let tempAverage = 0
let humidityAverage = 0


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: "Change Your Child's diaper!",
    body: 'Click here to disable repeat.',
    data: {},
  };

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  // notificationData.push({timestamp: currentDate})

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
      
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useInterval(getAverages, 6000)

  const { storedNotifications, setStoredNotifications } = useNotificationData()

  const [loaded] = useFonts({
    Koulen: require('./assets/fonts/Koulen-Regular.ttf')
  })
  if (!loaded) {
    console.log('why wont you work')
    return <AppLoading />;
  }

  async function getAverages() {
    console.log("getting info:")
    fetch("http://192.168.87.229/")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (sensorData.length >= 10) {
          
          sensorData.shift()
          sensorData.push(data)
          tempAverage = 0
          humidityAverage = 0
          sensorData.push(data)
          const tempData = sensorData.map(x => x.temp)
          tempData.forEach(x => tempAverage += x)
          tempAverage = tempAverage/tempData.length
          const humidityData = sensorData.map(x => x.humidity)
          humidityData.forEach(x => humidityAverage += x)
          humidityAverage = humidityAverage/humidityData.length
          console.log("Temperature average:" + tempAverage)
          // console.log("Temperature data:"+tempData)
          console.log("Humidity average:"+humidityAverage)
          // console.log("Humidity data:"+humidityData)
          if (data.humidity - humidityAverage > 10) {
            console.log("Alert!")
              let newSet = [...storedNotifications]
              newSet.push({
                  timestamp: "2023-08-24"
              })
              setStoredNotifications(newSet)
              sendPushNotification(expoPushToken)
          }
          // console.log(sensorData)
        } else {
          tempAverage = 0
          humidityAverage = 0
          sensorData.push(data)
          const tempData = sensorData.map(x => x.temp)
          tempData.forEach(x => tempAverage += x)
          tempAverage = tempAverage/tempData.length
          const humidityData = sensorData.map(x => x.humidity)
          humidityData.forEach(x => humidityAverage += x)
          humidityAverage = humidityAverage/humidityData.length
          console.log("Temperature average:" + tempAverage)
          // console.log("Temperature data:"+tempData)
          console.log("Humidity average:"+humidityAverage)
          // console.log("Humidity data:"+humidityData)
          // console.log(sensorData)
        }
      })
  }
  
  return (
    <NotifContext.Provider value={storedNotifications}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#1D294F',
              height: 60
            },
            tabBarButton: [
              "Notif", "TestNotifications"
            ].includes(route.name)
              ? () => {
                  return null;
                }
              : undefined,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Alerts') {
                iconName = focused
                  ? 'chart-box'
                  : 'chart-box-outline';
              } else if (route.name === 'TestNotifications') {
                iconName = focused ? 'information' : 'information-outline';
              } else if (route.name === 'Home') {
                iconName = focused ? 'home-circle' : 'home-circle-outline';
              }

              // You can return any component that you like here!
              return <MaterialCommunityIcons name={iconName} size={40} color={color} />;
            },
            tabBarActiveTintColor: '#D8ECFF',
            tabBarInactiveTintColor: '#D8ECFF',
          })}
          style={styles.navbar}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Alerts" component={AlertsScreen} />
          <Tab.Screen name="TestNotifications" component={TestNotification} />
          <Tab.Screen name="Notif" component={NotifScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NotifContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


