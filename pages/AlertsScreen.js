import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'

const AlertsScreen = ({ navigation, route }) => { 
    return (
        <View>
            <Text>Alerts go here!</Text>
            
        </View>
    )
}

const linedata = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

// let alertData = [
//     {
//         type: 'Alert',
//         time: new Date('2023-7-21T04:24:00')
//     },
//     {
//         type: 'Alert',
//         time: new Date('2023-7-20T04:24:00')
//     },
//     {
//         type: 'Alert',
//         time: new Date('2023-7-20T04:24:00')
//     },
//     {
//         type: 'Alert',
//         time: new Date('2023-7-21T04:24:00')
//     },
//     {
//         type: 'Alert',
//         time: new Date('2023-7-19T04:24:00')
//     },
//     {
//         type: 'Alert',
//         time: new Date('2023-7-16T04:24:00')
//     },
//     {
//         type: 'Alert',
//         time: new Date('2023-7-18T04:24:00')
//     },
//     {
//         type: 'Alert',
//         time: new Date('2023-7-18T04:24:00')
//     }
// ]

// console.log(alertData.filter(date => date.time.includes('2023-7-21')))

export default AlertsScreen