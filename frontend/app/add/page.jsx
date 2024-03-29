import * as React from 'react';
import { View, Button, Text, TextInput, StyleSheet ,Dimensions,TouchableOpacity,Image, ImageBackground, ActivityIndicator } from 'react-native';
import { app, auth } from "../../firebase/firebase"
import { getFirestore, doc, setDoc, updateDoc , arrayUnion ,} from "firebase/firestore";
import { useNavigation } from '@react-navigation/core'
import uuid from 'react-native-uuid';
import { useState,useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePost = () => {
    
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [submit, setSubmit] = useState(true)
    const db = getFirestore(app);
    const navigation = useNavigation();


    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.75,
          base64: true,
        });
    
        if (!result.canceled) {
          const base64 = `data:image/png;base64,${result.assets[0].base64}`;
          setimageURL(base64)
          // user?.setProfileImage({
          //   file: base64,
          // });
        }
      };


      useEffect(() => {
        getUser()

      }, [])
      
    
      const getUser = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("user");
          setCurrentUser(JSON.parse(savedUser));
          //console.log(currentUser);
        } catch (error) {
          console.log(error);
        }
      };
      //getUser()
      


    const SubmitOrder = async (currentUser) => {
        if (caption === '' ) {
            alert('Enter Caption');
            // setVisible(true); // Assuming setVisible is defined elsewhere in the actual code
            return;
        }
        setSubmit(false)
        const uid = uuid.v4()
        await setDoc( doc ( db, "posts", uid), {
            id:uid,
            caption: caption,
            category: "POST",
            createdAt: Date.now(),
            createdBy: currentUser.uid,
            imageURL: imageURL,
            upvoters: [],
            downvoters: [],
            votes:0,
            comments: [],
            location: location,
            userName:currentUser.username,
            userAge:currentUser.createdAt,
            description:description,
            userImage:currentUser.profilePicURL,
        }).then(() => {
            updateDoc(doc(db, "users", auth.currentUser?.uid), {  posts: arrayUnion(uid) })
            setCaption('')
            setDescription('')
            setLocation("")
            setimageURL('')
            setSubmit(true)
            alert("Posted")
            //navigation.replace("orderScreen");
        });
    }

    return (
        <>
   
       {submit?


        <View style={styles.container}>
            <Text style={{ fontSize: 18, justifyContent: 'center', alignItems: 'center' }}>Create a Post</Text>
            <TextInput   multiline={true} numberOfLines={1} value={caption} maxLength={30} onChangeText={setCaption} placeholder='Caption' style={styles.input}></TextInput>
            <TextInput  multiline={true} numberOfLines={4} maxLength={70} value={description} onChangeText={setDescription} placeholder='Description' style={styles.inputDes}></TextInput>
            <TextInput   value={location}  multiline={true} numberOfLines={1} maxLength={30}  onChangeText={setLocation}  placeholder='Location' style={styles.input}></TextInput>
            
           
            {imageURL!=""?
            <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>setimageURL("")} style={{position:'absolute', zIndex:2, margin:10, alignSelf:'flex-end'}}>
                <MaterialCommunityIcons name="close-circle" size={20} color="red"  />
            </TouchableOpacity>
            <ImageBackground source={{
              uri: imageURL,
            }} style={{flex: 1,
                resizeMode: 'cover',width: '100%',alignSelf:'center'}}   imageStyle={{ borderRadius: 10}}/>
                </View>
            :null
            }
            
            <TouchableOpacity onPress={onCaptureImage}>
            <FontAwesome5 name="image" size={20} color="black" />
            </TouchableOpacity>
           
            
            <Button title="Create Post" style={styles.actionButtonGroup} onPress={()=>SubmitOrder(currentUser)}  />
        </View>: <View style={styles.container}><ActivityIndicator style={{marginVertical:windowHeight/3, alignSelf:'center'}}/></View>}
        </>
    );
}

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start', // Changed 'left' to 'flex-start' to fix TypeScript error
        margin: 30
    },
    imageContainer: {
        alignSelf:'center',
        backgroundColor:'#0005',
        borderRadius: 10,
        height: 200,
        width: windowWidth -80,
  
      },
    blueBox: {
        padding: 40,
        width: '100%',
        height: 365,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#133BB7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonGroup: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginVertical: 30,
        borderRadius: 10
    },
    input: {
        height: 50,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 5,
        width: '100%' // Removed duplicate width property
    },
    inputDes: {
        height: 100,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 5,
        width: '100%' // Removed duplicate width property
    },
})

