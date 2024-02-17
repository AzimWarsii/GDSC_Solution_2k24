
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'
import OrganizePage from '@/components/OrganizePage'
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  ImageBackground,
  
} from 'react-native';
import { Link } from 'expo-router';
const { width, height } = Dimensions.get('window');
import Dates from '@/components/Dates';
import { LinearGradient } from 'expo-linear-gradient';

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const drives = [{ key: 'empty-left' },{
  "key": "1072790",
  "title": "Ongoing Drive",
  "poster": "https://media.istockphoto.com/id/154890047/photo/ocean-dumping-total-pollution-on-a-tropical-beach.jpg?s=2048x2048&w=is&k=20&c=dOZMtmcvq2HG7Be9CE9ZZG4qIXo5yVKQZjUPmaUMGao=",
  "backdrop": "https://media.istockphoto.com/id/154890047/photo/ocean-dumping-total-pollution-on-a-tropical-beach.jpg?s=2048x2048&w=is&k=20&c=dOZMtmcvq2HG7Be9CE9ZZG4qIXo5yVKQZjUPmaUMGao=",
  "rating": 6.9,
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "dates": ["Tuesday's","Friday's"],
},{
  "key": "933131",
  "title": "Ongoing Drive",
  "poster": "https://media.istockphoto.com/id/1176398761/photo/fishes-in-water-polluted-with-plastic-waste.jpg?s=2048x2048&w=is&k=20&c=SySfn9w8N1CwOD-jphawGxnSZ1OA0Sa30JSZOF4dquo=",
  "backdrop": "https://media.istockphoto.com/id/1176398761/photo/fishes-in-water-polluted-with-plastic-waste.jpg?s=2048x2048&w=is&k=20&c=SySfn9w8N1CwOD-jphawGxnSZ1OA0Sa30JSZOF4dquo=",
  "rating": 6.708,
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "dates": ["2024-6-13 to 2024-6-21",]
},{
  "key": "1212073",
  "title": "Ongoing Drive",
  "poster": "https://media.istockphoto.com/id/1183347762/photo/environmental-conservation-collecting-garbage-and-trash-from-water.jpg?s=1024x1024&w=is&k=20&c=-eyGoxTNgRooQ3e0NwnqOCY-_7ArSn3aRpYpqsGipiE=",
  "backdrop": "https://media.istockphoto.com/id/1183347762/photo/environmental-conservation-collecting-garbage-and-trash-from-water.jpg?s=1024x1024&w=is&k=20&c=-eyGoxTNgRooQ3e0NwnqOCY-_7ArSn3aRpYpqsGipiE=",
  "rating": 6.875,
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "dates": ["2024-5-21","2024-5-22"]
},
{
  "key": "1214314",
  "title": "Ongoing Drive",
  "poster": "https://media.istockphoto.com/id/1133794050/photo/swan-swims-in-contaminated-water-with-plastic-bottles.jpg?s=2048x2048&w=is&k=20&c=suRAIQLGbMWAiTOhCCDk6R9y1RdD-Ja0MOz1lgEOjZM=",
  "backdrop": "https://media.istockphoto.com/id/1133794050/photo/swan-swims-in-contaminated-water-with-plastic-bottles.jpg?s=2048x2048&w=is&k=20&c=suRAIQLGbMWAiTOhCCDk6R9y1RdD-Ja0MOz1lgEOjZM=",
  "rating": 6.669,
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  "dates": ["2025-3-21",]
}, { key: 'empty-right' }
]

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ drives, scrollX }) => {
  return (
    <>
    <View style={{zIndex:2 , position:'absolute' , alignSelf:'flex-end' }}>
              <Link  href={'/(modals)/drive'} asChild> 
               <TouchableOpacity style={styles.button}> 
               {/* <ImageBackground source={ocean} style={styles.image}> */}
                    <Text style={styles.textMain}>+</Text>
  
                {/* </ImageBackground> */}
               
               </TouchableOpacity>
               </Link>
               </View>
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      
      <FlatList
        data={drives.reverse()}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <>
            
            
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}
            > 
              
            
              <ImageBackground
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              >
                {/* <View style={{zIndex:2}}>
                 <Link  href={`/user/page`} asChild> 
               <TouchableOpacity style={styles.button} asChild> 
               <ImageBackground source={ocean} style={styles.image}>
               <Text style={styles.textMain}>ORGANIZE
               </Text>
               </ImageBackground>
               
               </TouchableOpacity>
               </Link>
               </View> */}
              </ImageBackground>
            </Animated.View>
            </>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
    </>
  );
};

export default function organize() {
  // const [drives, setDrives] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      // const drives = await getDrives();
      // console.log(drives)
      // Add empty items to create fake space
      // [empty_item, ...drives, empty_item]
      // setDrives([{ key: 'empty-left' }, ...drives, { key: 'empty-right' }]);
    };

    if (drives.length === 0) {
      fetchData(drives);
    }
  }, [drives]);

  if (drives.length === 0) {
    return <Loading />;
  }
  return (
    
    <View style={styles.container}>
      
      <Backdrop drives={drives} scrollX={scrollX} />
      
      <StatusBar hidden />
      
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={drives}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
           
            <View style={{ width: ITEM_SIZE }}>
              
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: 'white',
                  borderRadius: 34,
                }}
              > 
              <TouchableOpacity>
                <ImageBackground
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                  imageStyle={{ borderRadius: 24}}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                {/* <Rating rating={item.rating} /> */}
                <Dates dates={item.dates} />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    
    height: ITEM_SIZE * 1,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  button: {
    // zIndex:4,
    borderRadius:100,
    marginTop:30,
    // width:250,
    height:60,
    width:60,
    // paddingLeft: 10,
    // paddingRight: 10,
     backgroundColor: '#D4E6F8',
    shadowColor: '#000',
    shadowOpacity: 66,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf:'center',
    // elevation: 6,
    shadowRadius: 10 ,
    marginHorizontal:20,
    shadowOffset : { width: 0, height: 1},
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 100,
    borderRadius: 100,
    
    //marginTop: 40,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    padding: 20,
    overflow: "hidden",
  },
  textMain: {
    zIndex:2,
    fontFamily: "mon-b",
    color: "#fff",
    fontSize: 40,
    //backgroundColor: "#fff",
    // margin: 8,
    // padding: 5,
    borderRadius: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3
}
});