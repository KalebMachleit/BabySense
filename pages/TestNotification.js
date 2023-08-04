import { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, Button, Platform, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import useInterval from '../polling/useInterval';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import LogItem from '../components/LogItem';
import useNotificationData from '../hooks/useNotificationData';
import { NotifContext } from '../App';


let sensorData = []
let tempAverage = 0
let humidityAverage = 0
let notificationData = []

const sortData = () => {

  let currentDate = new Date().toJSON().slice(0, 10);
  console.log(currentDate)

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)  
  console.log(sevenDaysAgo.toJSON().slice(0, 10))
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


async function getAverages() {
  console.log("getting info:")
  fetch("http://192.168.87.208/")
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



// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
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

  notificationData.push({timeStamp: currentDate})

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


export default function TestNotification() {
  const notifs = useContext(NotifContext)
  const { storedNotifications, setStoredNotifications} = useNotificationData()
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
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // useInterval(getAverages, 6000)
  

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor:'#D8ECFF', justifyContent:"center"}}>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
      <Button
        title="Pull sensor data"
        onPress={async () => {
          await getAverages()
        }}
      />
      <Button
        title="Get date range"
        onPress={() => {
          sortData()
        }}
      />
      <Button
        title="does this work?"
        onPress={() => {
          let newSet = [...storedNotifications]
          newSet.push({
              timestamp: "2023-08-24"
          })
          setStoredNotifications(newSet)
      }}/>
      <Text>{notifs.length}</Text>
    </View>
  );
}


const styles = StyleSheet.create ({
})

