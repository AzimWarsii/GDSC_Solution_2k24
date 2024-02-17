import { SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import ocean from "@/assets/images/ocean.jpg"

const OrganizePage = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={{marginHorizontal: 5,}}>
            <TouchableOpacity>
                <ImageBackground source={ocean} style={styles.image}>
                    <Text style={styles.textMain}>Be the changemaker</Text>
                    <Text style={styles.textMain}>Organize a cleanup drive</Text>
                    <Text style={styles.textMain}>in your area!</Text>
                </ImageBackground>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

export default OrganizePage

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor:"#fff", 
        paddingTop: StatusBar.currentHeight,
    },
    textMain: {
        fontFamily: "mon-b",
        color: "#000",
        fontSize: 20,
        backgroundColor: "#fff",
        margin: 8,
        padding: 5,
        borderRadius: 5
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      height: 300,
      borderRadius: 20,
      marginTop: 40,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      alignItems: "center",
      padding: 20,
      overflow: "hidden",
    },
})