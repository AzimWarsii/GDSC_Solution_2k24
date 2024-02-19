import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;


const MarketListItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
         
        <View style={styles.imageContainer}>
          {item.uri!=""?
          <Image source={{
              uri: item.uri,
            }} style={styles.image} />
            :
            <Image source={require('assets/images/store.png')} style={{flex: 1,
              resizeMode: 'cover',width: '80%',alignSelf:'center'}} />
            }
        </View>
        <View style={styles.textContainer}>
          <View style={styles.infoContainer}>
            <Text numberOfLines={2} style={styles.itemName}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.itemLocation}>{item.location}</Text>
          </View>
          <View style={{flexDirection:'row'}} >
            {item.status=='Verified' &&
            <>
            <FontAwesome5 name={"check"}  style={styles.itemStatus}  />
            <Text style={styles.itemStatus}>{item.status}</Text>
            </>
            }
          </View>
        </View>
          
        </View>
        </TouchableOpacity>
      );
}

export default MarketListItem

const styles = StyleSheet.create({
    item: {
      marginHorizontal: 8,
       backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3,
        elevation: 10,
        margin: 5,
        height: 230,
        borderRadius: 15,
        fontFamily: "mon-sb",
    },
    itemPhoto: {
      width: 200,
      height: 200,
    },
    itemName: {
      fontFamily:'mon-sb',
      color: '#000',
      fontSize:15,  
      marginTop: 5,
      marginBottom:3,
      marginLeft:7.5,
      marginRight:7.5
    },
    itemLocation: {
      
      //ellipsizeMode:"tail",
      fontFamily:'mon-sb',
      color: '#0007',
      fontSize:12,  
      marginLeft: 7.5,
      marginRight:7.5
    },
    itemStatus: {
      //height:14,
      //position:'absolute',
      //bottom:14,
      fontFamily:'mon-sb',
      color: '#1e90ff',
      fontSize:13,  
      marginLeft: 7.5,
      
    },
    imageContainer: {
      backgroundColor:'#0005',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      height: 110,
      width: windowWidth - 230,

    },
    infoContainer:{
      height:92,
      width: windowWidth - 230,
    },
    textContainer:{
      height:120,
      width: windowWidth - 230,
    },
    image: {
       borderTopLeftRadius: 15,
       borderTopRightRadius: 15,
      flex: 1,
      resizeMode: 'cover',
      width: '100%',
    }
  });