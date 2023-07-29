import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Alerts', {name:'Alerts'})} style={styles.toAlerts}>
                <MaterialCommunityIcons name="human-baby-changing-table" size={60} color="black" />
                <Text style={styles.toAlertsText}>Change Log</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TestNotifications', {name:'TestNotifications'})} style={styles.toAlerts}>
                <Text style={styles.toAlertsText}>see if the thing works</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create ({
    toAlerts: {
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: '#FDFFBC',
        borderColor: 'yellow',
        borderWidth: 5,
        borderRadius: 10,
        margin: 10,
    },
    toAlertsText: {
        fontSize: 40,
        marginRight: 10,
    }
})