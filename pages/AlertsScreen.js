import { Text, View, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import LogItem from '../components/LogItem';
import { useEffect, useState, useContext } from 'react';
import { CurrentRenderContext } from '@react-navigation/native';
import useNotificationData from '../hooks/useNotificationData';
import { NotifContext } from '../App';

const AlertsScreen = ({ navigation, route }) => { 
    const notifs = useContext(NotifContext)
    // const { storedNotifications, setStoredNotifications} = useNotificationData()
    const [data, setData] = useState()
    const [day, setDay] = useState(27)
    const [month, setMonth] = useState(8)
    const [year, setYear] = useState(2023)
    const [today, setToday] = useState('')
    const [sevenDaysAgo, setSevenDaysAgo] = useState('')

    useEffect(() => {
        setDay(new Date().getDate())
        setMonth(new Date().getMonth())
        setYear(new Date().getFullYear())
        let date = new Date().toString().slice(0, 10)
        let today = new Date()
        let sevenDaysAgo = today.setDate(today.getDate() - 7)
        setToday(date)
        setSevenDaysAgo(new Date(sevenDaysAgo).toString().slice(0,10))
    }, [])

    useEffect(() => {
      sortData(day, month, year)
      }, [notifs]);

      const sortData = (day, month, year) => {
        let newData = []
      for (let i = 0; i <= 6; i++) {
        let date = new Date(year, (month - 1), day)
        let xDaysAgo = date.setDate(date.getDate() - i)
        let result = new Date(xDaysAgo).toJSON().slice(0, 10)
        // console.log(result, 'Number of matches:', storedNotifications.filter(x => x.timestamp == result).length)
        newData.push({
            date: result.slice(5, 10),
            alertNum: notifs.filter(x => x.timestamp == result).length,
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
          {today} - {sevenDaysAgo}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({item}) => <LogItem date={item.date} alertNum={item.alertNum} />}
        keyExtractor={item => item.id}
        style={styles.list}
        extraData={data}
      />
    </View>
    )
}

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
  
  