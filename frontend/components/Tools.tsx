import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'

const Tools = () => {
  return (
    <View style={styles.theBox}>
        <View style={styles.theRow}>
            <TouchableOpacity style={styles.infoContainer}>
                <View style={styles.iconView}>
                    <FontAwesome5 name="fish" size={20} color="black" />
                </View>
                <Text style={styles.displayText}>Identify</Text>
                <Text style={styles.displayText}>Species</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoContainer}>
                <View style={styles.iconView}>
                    <MaterialCommunityIcons name="file-find" size={20} color="black" />
                </View>
                <Text style={styles.displayText}>Report</Text>
                <Text style={styles.displayText}>Sighting</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.theRow}>
            <TouchableOpacity style={styles.infoContainer}>
                <View style={styles.iconView}>
                    <MaterialCommunityIcons name="food-turkey" size={20} color="black" />
                </View>
                <Text style={styles.displayText}>Eat</Text>
                <Text style={styles.displayText}>Sustainably</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoContainer}>
                <View style={styles.iconView}>
                    <MaterialIcons name="explore" size={20} color="black" />
                </View>
                <Text style={styles.displayText}>Explore the</Text>
                <Text style={styles.displayText}>Oceans</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    theBox: {
        flexDirection: "column",
        padding: 2,
        marginBottom: 5,
        marginTop: 5,
        height: 300,
    },
    theRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    infoContainer: {
        backgroundColor: "#D4E6F1",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        width: "45%",
        margin: 5,
        height: 120,
        borderRadius: 10,
        fontFamily: "mon-sb",
        padding: 20

    },
    iconView: {
        backgroundColor:"#fff", 
        borderRadius:100, 
        width:35, 
        height: 35, 
        alignItems:"center", 
        justifyContent: "center",
        marginBottom: 4,
    },
    displayText: {
        fontFamily: "mon-sb"
    },
})


export default Tools