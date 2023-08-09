import {View, StyleSheet, Text} from 'react-native'

const LogItem = ({date, alertNum}) => (
    <View style={styles.item}>
      <View style={styles.left}>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.text}>{alertNum}</Text>
      </View>
    </View>
);

export default LogItem

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 4,
    },
    left: {
        width: '40%',
        height: 50,
        backgroundColor: '#1D294F',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    right: {
        width: '40%',
        height: 50,
        backgroundColor: '#255792',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
    },
    text: {
        fontSize: 25,
        fontFamily: 'Koulen',
        color: '#FFFFFF',
        textAlign: 'center'
    }
})