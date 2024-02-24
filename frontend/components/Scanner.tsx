import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Scanner = () => {
  return (
    <View style={{marginLeft: 10, marginRight: 10}}>
      <Text style={{fontFamily:"mon-sb", marginBottom:20, fontSize: 16}}>Heal your fish</Text>
      <View style={styles.container}>
        <View style={styles.infographic}>
            <View style={styles.infoBox}>
                <Entypo name="camera" size={24} color="black" />
                <Text style={{fontFamily: "mon"}}> Take a</Text>
                <Text  style={{fontFamily: "mon"}}> picture</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="black" style={styles.infoBox}/>
            <View style={styles.infoBox}>
                <Entypo name="text-document-inverted" size={24} color="black" />
                <Text  style={{fontFamily: "mon"}}>See</Text>
                <Text  style={{fontFamily: "mon"}}>diagnosis</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="black" style={styles.infoBox}/>
            <View style={styles.infoBox}>
                <FontAwesome name="medkit" size={24} color="black" />
                <Text  style={{fontFamily: "mon"}}>Get</Text>
                <Text  style={{fontFamily: "mon"}}>Medicine</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.camBtn}>
            <Text style={{fontFamily: "mon-sb", color: "#fff"}}>
                Take a picture
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    infographic:{
        flexDirection: "row",
        letterSpacing: 10,
        padding: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    container: {
        backgroundColor: "#E8E8E8",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10

    },
    infoBox: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    camBtn: {
        backgroundColor: Colors.primary,
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10, 
        paddingRight: 10,
        marginBottom: 30
    },
})

export default Scanner