import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import Tools from './Tools'
import Scanner from './Scanner'

const ToolListings = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={{marginHorizontal: 5,}}>
            <Tools/>
            <Scanner/>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor:"#fff", 
        paddingTop: StatusBar.currentHeight,
    },
})

export default ToolListings