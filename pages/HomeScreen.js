import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications';
import { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenA } from './HomeScreen-A';
import { ScreenB } from './HomeScreen-B';

const Home = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    const responseListener = useRef();
    const notificationListener = useRef();

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        navigation.navigate('Notif')
      });
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        navigation.navigate('Notif')
    });
    
    return (
            <Home.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
            >
                <Home.Screen name='home' component={ScreenA}/>
                <Home.Screen name='connect' component={ScreenB}/>
            </Home.Navigator>
    )
}









export default HomeScreen

const styles = StyleSheet.create ({
    baby: {
        top: '15%'
    },
    text: {
        fontFamily: 'Koulen',
        fontSize: 60,
        color: '#1D294F',
        top: '20%'
    },
    connect: {
      width: 252,
      height: 84,
      backgroundColor: '#1D294F',
      borderRadius: 39,
      top: '30%',
    },
    connectText: {
      fontSize: 48,
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Koulen'
    },
    icon: {
        top: '10%'
    },
    header: {
        fontFamily: 'Koulen',
        fontSize: 80,
        color: '#1D294F',
        top: '10%'
    },
    done: {
        width: '40%',
        height: 55,
        backgroundColor: '#1D294F',
        borderRadius: 39,
        top: '30%',
      },
    doneText: {
        fontSize: 32,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Koulen'
      },
})