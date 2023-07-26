import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'

const AlertsScreen = ({ navigation, route }) => { 
    return (
        <View>
            <Text>Alerts go here!</Text>
            <LineChart
                data={linedata}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                yAxisLabel={''}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
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