
import { StatusBar } from 'expo-status-bar';
import MarketListItem from "../../components/MarketListItem"
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


export default function market(){
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({ section }) => (
            <>
              <View style={{flexDirection:'row' , marginBottom:8}}>
               <View  style={styles.iconView}>
                    <FontAwesome5 name={section.icon} size={20} color="black" />
                   
                </View>
                <Text style={styles.sectionHeader}>{section.title}</Text> 
                </View>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => <MarketListItem  item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
                ) : null}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <MarketListItem item={item} />;
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'AquaFarmers',
    horizontal: true,
    category:'1',
    icon:"store",
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #d3f0ff 100%)",

    data: [
      {
        key: '1',
        name: 'Lets try writing a long Name',
        location:'Lets try writing a long Location Lets try writing a long Location',
        status:'Verified',
        uri: 'https://fishfarmtank.com/wp-content/uploads/2019/05/6-home-fish-farming-tank.jpg',
      },
      {
        key: '2',
        name: 'Name',
        location:'Location',
        status:'Not Verified',
        uri: 'https://ogden_images.s3.amazonaws.com/www.motherearthnews.com/images/2022/05/12163447/recirculating-fish-farm-412x300.jpg',
      },

      {
        key: '3',
        name: 'Name',
        location:'Location',
        status:'Verified',
        uri: 'https://ogden_images.s3.amazonaws.com/www.motherearthnews.com/images/1979/11/22174025/060-home-fish-farming-defun-fotolia.jpg',
      },
      {
        key: '4',
        name: 'Name',
        location:'Location',
        status:'Verified',
        uri: 'https://s3.amazonaws.com/kajabi-storefronts-production/site/7230/images/vwSRMLTRQz2xAW04kVL4_backyard_fish_farming.jpg',
      },
      {
        key: '5',
        name: 'Name',
        location:'Location',
        status:'Verified',
        uri: 'https://www.theaquaponicsource.com/wp-content/uploads/2020/10/Fish-Farm-600-Product-Image-scaled.jpg',
      },
    ],
  },
  {
    title: 'Fish Food',
    horizontal: true,
    category:'2',
    icon:"fish",
    data: [
      {
        key: '1',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: 'https://content.jdmagicbox.com/comp/rudrapur/j9/9999p5944.5944.160422100923.k6j9/catalogue/nitin-fish-aquarium-khera-rudrapur-aquariums-xj4sgg54zd.jpg',
      },
      {
        key: '2',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: 'https://content.jdmagicbox.com/comp/hyderabad/x7/040pxx40.xx40.130916132145.l4x7/catalogue/gills-and-fins-acquirium-shop-chintal-hyderabad-pet-shops-14avz7t.jpg?clr=',
      },

      {
        key: '3',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Not Verified',
        uri: 'https://media.istockphoto.com/id/687479244/photo/pet-shop-aquarium-with-goldfish.jpg?s=1024x1024&w=is&k=20&c=S44igR9ibHh2XKN3XBr-oWpMEFdOS9tHOVVCrotuQ1Q=',
      },
      {
        key: '4',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: 'https://media.istockphoto.com/id/1344706066/photo/closeup-view-of-fish-food-granules.jpg?s=1024x1024&w=is&k=20&c=YVzamYqD8NMEIGIdHrG2LhmovAM8EFHJG7nXcxA5U70=',
      },
      {
        key: '5',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: 'https://content.jdmagicbox.com/comp/siliguri/e6/9999px353.x353.160927124948.j7e6/catalogue/the-fish-people-hakimpara-siliguri-aquarium-fish-dealers-ea2b9f18ol-250.jpg?clr=',
      },
    ],
  },
  {
    title: 'Shop Category',
    horizontal: true,
    category:'3',
    icon:"water",
    data: [
      {
        key: '1',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: '',
      },
      {
        key: '2',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: '',
      },

      {
        key: '3',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: '',
      },
      {
        key: '4',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: '',
      },
      {
        key: '5',
        name: 'Shop Name',
        location:'Shop Location',
        status:'Verified',
        uri: '',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    fontFamily:'mon-b',
    //fontWeight: '800',
    fontSize: 17,
    color: '#000',
    marginTop: 27,
    marginBottom: 5,
    marginLeft:15
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
  iconView: {
    backgroundColor: "#D4E6F1",
    borderRadius:17, 
    width:45, 
    height: 45, 
    alignItems:"center", 
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 5,
    marginLeft:7,
}
});