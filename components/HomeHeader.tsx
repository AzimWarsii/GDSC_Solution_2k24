import { View, Text, SafeAreaView,Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const HomeHeader = () => {
    const { user } = useUser();
  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
     
        <View style={styles.actionRow}>
            
          <Text style={styles.logo}>App Name</Text>
          
          <Link href={`/upload/page`} asChild>
          <TouchableOpacity style={styles.filterBtn}>
          <Ionicons size={30} name="add-outline"/> 
         </TouchableOpacity>
          </Link>
          
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    button:{
      backgroundColor: '#000',
      height: 35,
      width: 90,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button1:{
      backgroundColor: 'transparent',
      height: 35,
      width: 90,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    }
    ,
    container: {
      backgroundColor: '#fff',
      height: 90,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    logo:{
      marginTop:15,
      fontSize:23
    },
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingTop:20
      //justifyContent: 'space-between',
     // paddingHorizontal: 24,
      //paddingBottom: 16,
    },
  
    searchBtn: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      gap: 10,
      padding: 14,
      alignItems: 'center',
      width: 280,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#c2c2c2',
      borderRadius: 30,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
    filterBtn: {
      position:'absolute',
  
      right:20,
      top:20,
      //borderWidth: 1,
     // borderColor: '#A2A0A2',
      //borderRadius: 24,
    },
    categoryText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: '#A2A0A2',
    },
    categoryTextActive: {
      fontSize: 14,
      fontFamily: 'mon-sb',
      color: '#fff',
    },
    categoriesBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 50,
      backgroundColor: '#A2A0A2',
    },
    categoriesBtnActive: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: '#000',
      //borderBottomWidth: 2,
      paddingBottom: 8,
    },
  });

export default HomeHeader