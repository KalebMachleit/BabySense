import { Text, View, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import LogItem from '../components/LogItem';
import { useEffect, useState, useContext } from 'react';
import { CurrentRenderContext } from '@react-navigation/native';
import useNotificationData from '../hooks/useNotificationData';

const AlertsScreen = ({ navigation, route }) => { 
    const { storedNotifications, setStoredNotifications} = useNotificationData()
    const [data, setData] = useState()
    const [day, setDay] = useState(27)
    const [month, setMonth] = useState(8)
    const [year, setYear] = useState(2023)

    useEffect(() => {
      sortData(day, month, year)
      }, [storedNotifications]);

      const sortData = (day, month, year) => {
        let newData = []
      for (let i = 0; i <= 6; i++) {
        let date = new Date(year, (month - 1), day)
        let xDaysAgo = date.setDate(date.getDate() - i)
        let result = new Date(xDaysAgo).toJSON().slice(0, 10)
        // console.log(result, 'Number of matches:', storedNotifications.filter(x => x.timestamp == result).length)
        newData.push({
            date: result.slice(5, 10),
            alertNum: storedNotifications.filter(x => x.timestamp == result).length,
            id: i
        })
      }
      setData(newData)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor:'#D8ECFF'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          CHANGE LOG
        </Text>
      </View>
      <TouchableOpacity style={styles.dates}>
        <Text style={styles.datesText}>
          August 21-27 2023
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({item}) => <LogItem date={item.date} alertNum={item.alertNum} />}
        keyExtractor={item => item.id}
        style={styles.list}
        extraData={data}
      ></FlatList>
      <Button
        title="Reload"
        onPress={() => {
          sortData(27, 8, 2023)
        }}
      />
      <Button
        title="Update Info"
        onPress={() => {
            let newSet = [...storedNotifications]
            newSet.push({
                timestamp: "2023-08-24"
            })
            setStoredNotifications(newSet)
        }}/>
    </View>
    )
}



const notifications = [
    {
        timestamp: "2023-08-24"
    },
    {
        timestamp: "2023-08-21"
    },
    {
        timestamp: "2023-08-23"
    },
    {
        timestamp: "2023-08-22"
    },
    {
        timestamp: "2023-08-22"
    },
    {
        timestamp: "2023-08-27"
    },
    {
        timestamp: "2023-08-02"
    },
    {
        timestamp: "2023-08-24"
    },
    {
        timestamp: "2023-08-02"
    },
]

export default AlertsScreen

const styles = StyleSheet.create ({
    header: {
      width: 316,
      height: 78,
      backgroundColor: '#1D294F',
      borderRadius: 39,
      top: 60,
    },
    headerText: {
      fontSize: 48,
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Koulen'
    },
    dates: {
      width: 280,
      height: 50,
      backgroundColor: '#255792',
      borderRadius: 25,
      top: 120,
    },
    datesText: {
      fontSize: 25,
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Koulen'
    },
    list: {
      top: 180,
      borderRadius: 25,
    }
  })
  
  