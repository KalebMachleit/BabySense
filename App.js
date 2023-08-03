import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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



const Tab = createBottomTabNavigator();
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

  const [loaded] = useFonts({
    Koulen: require('./assets/fonts/Koulen-Regular.ttf')
  })
  if (!loaded) {
    console.log('why wont you work')
    return <AppLoading/>;
  }
  

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#1D294F',
            height: 60
          },
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
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Alerts" component={AlertsScreen} />
        <Tab.Screen name="TestNotifications" component={TestNotification} />
      </Tab.Navigator>
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
  navbar: {
    backgroundColor: '#1D294F'
  }
});


