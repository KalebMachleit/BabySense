import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import useInterval from '../polling/useInterval';

let sensorData = []
let tempAverage = 0
let humidityAverage = 0

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
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

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

// async function getAverages() {
//   console.log("think!")
//   // let reading = []
//   // let temperature = await fetch("http://192.168.87.208/").then(response => response.temp)
//   // let humidity = await fetch("http://192.168.87.208/").then(response => response.humidity)
//   // reading.push(temperature)
//   // reading.push(humidity)
//   // console.log("Readings:" + reading + temperature + humidity)
// }

export default function TestNotification() {
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

  useInterval(getAverages, 6000)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
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
    </View>
  );
}

