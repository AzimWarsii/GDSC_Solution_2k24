import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'

const ToolHeader = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Text style={styles.displayTitle}>
                    Seahorse
                </Text>
                <TouchableOpacity style={styles.tempButton}>
                    <Text>23°C</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        height: 50,
        paddingLeft:15,
        paddingRight: 15,
        paddingTop: 10,
    },
    actionRow:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    tempButton:{
        backgroundColor:"#D4E6F1",
        borderTopLeftRadius: 55, 
        borderTopRightRadius: 55, 
        borderBottomLeftRadius: 55, 
        borderBottomRightRadius: 55, 
        justifyContent: "center", 
        alignItems: "center",
        paddingLeft:8,
        paddingRight:8,
        paddingBottom: 2,
        paddingTop: 2,
    },
    displayTitle:{
        fontFamily: 'mon-b',
        color: Colors.dark,
        fontSize: 16,
      }
})

export default ToolHeader