import {
    SafeAreaView,
    TextInput,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { useAuth, useUser } from '@clerk/clerk-expo';
  import { defaultStyles } from '@/constants/Styles';
  import { Ionicons } from '@expo/vector-icons';
  import Colors from '@/constants/Colors';
  import { Link } from 'expo-router';
  import * as ImagePicker from 'expo-image-picker';
  import { View, TouchableOpacity, Button, Text, StyleSheet, Image ,ToastAndroid, onCaptureImage } from 'react-native';
  //import { Card, Avatar, MD3Colors } from 'react-native-paper';
  import { app, auth , firestore } from '../../firebase/firebase';
  import { useNavigation } from '@react-navigation/core'
  import { getFirestore, doc, getDoc,setDoc, updateDoc } from "firebase/firestore";
  import { useRouter } from 'expo-router';
  import { onSnapshot , collection,query,getDocs, where } from "firebase/firestore";
  

  
  const Page = () => {
    const router = useRouter();
    const [profileLoaded, setProfileLoaded] = React.useState(false)
    const [data, setData] = React.useState();
    const [newUserName, setNewUserName] = useState("")
    const [ selectedFile, setSelectedFile] = useState(null);
  
   async function handleEdit() {
    if (newUserName == '') {
        console.log('not entered any input');
        setEdit(false)
        return;
    }

    await updateDoc(doc(firestore, "users", auth.currentUser?.uid), {
        username: newUserName||auth.username,
    }).then(() => {  
      setEdit(false)
    });
}
async function handleEditProfile(selectedFile) {

  await updateDoc(doc(firestore, "users", auth.currentUser?.uid), {
      profilePicURL: selectedFile,
  }).then(() => {  
    setEdit(false)
  });
}

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                router.replace("/(modals)/login")
            })
            .catch(error => alert(error.message))
    }

    React.useEffect(() => {
        async function getUser() {
            try {
                const db = getFirestore(app);
                const docRef = doc(db, "users", auth.currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                    setProfileLoaded(true);
                } else {
                    setProfileLoaded(false);
                }
            } catch (e) {
                console.log(e)
            }
        }
        getUser();
    });



 
    const [userName, setUserName] = useState(data?.username);
    const [email, setEmail] = useState(data?.email);
    const [dp, setDp] = useState(data?.profilePicURL)
    const [edit, setEdit] = useState(false);
  
    // // Load user data on mount
    useEffect(() => {
      if (!data) {
        return;
      }
  
      setUserName(data.username);
      setEmail(data.email);
      setDp(data.profilePicURL)
    }, [data]);
  
  
    const onCaptureImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.75,
        base64: true,
      });
  
      if (!result.canceled) {
        const base64 = `data:image/png;base64,${result.assets[0].base64}`;
        setSelectedFile(base64)
        try{
        await updateDoc(doc(firestore, "users", auth.currentUser?.uid), {
          profilePicURL: base64,
      }).then(() => {  

      });
      }
      catch(e){
        console.log(e)
      }
        // user?.setProfileImage({
        //   file: base64,
        // });
      }
    };
  
    return (
      <SafeAreaView style={defaultStyles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <Ionicons name="notifications-outline" size={26} />
        </View>
  
        {data && (
          <View style={styles.card}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image source={{ uri: dp }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {!edit && (
                <View style={styles.editRow}>
                  <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                    {userName}
                  </Text>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons name="create-outline" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
              )}
              {edit && (
                <View style={styles.editRow}>
                  <TextInput
                    placeholder="Username"
                    value={newUserName || ''}
                    onChangeText={setNewUserName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TouchableOpacity onPress={()=>handleEdit()}>
                    <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text>{email}</Text>
           
          </View>
        )}
  
        {auth && <Button title="Log Out" onPress={() => handleSignOut()} color={Colors.dark} />}
        {!auth && (
          <Link href={'/(modals)/login'} asChild>
            <Button title="Log In" color={Colors.dark} />
          </Link>
        )}
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 24,
    },
    header: {
      fontFamily: 'mon-b',
      fontSize: 24,
    },
    card: {
      backgroundColor: '#fff',
      padding: 24,
      borderRadius: 16,
      marginHorizontal: 24,
      marginTop: 24,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 2,
      },
      alignItems: 'center',
      gap: 14,
      marginBottom: 24,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: Colors.grey,
    },
    editRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
  });
  
  export default Page;
  