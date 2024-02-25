// import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator,KeyboardAvoidingView, StyleSheet, Text, TextInput,Dimensions, TouchableOpacity, View } from 'react-native'
import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../firebase/firebase'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
const Strategy = {
  Google :'oauth_google',
  Apple : 'oauth_apple',
  Facebook : 'oauth_facebook',
} 

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setuserName] = useState('')
  const [bio, setBio] = useState('')
  const [role, setRole] = useState('')
  const [data, setData] = useState(null);
  const [profile, setProfile]= useState(false);
  const [profileLoaded, setProfileLoaded] = useState(true)

  const router = useRouter();
  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });


  const onSelectAuth = async strategy => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth
    }[strategy]
  
    try {
      const { createdSessionId, setActive } = await selectedAuth()
  
      if (createdSessionId) {
        setActive({ session: createdSessionId })
        router.back()
      }
    } catch (err) {
      console.error("OAuth error", err)
    }
  }
  

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
              router.replace('../')
          }
      })
      return unsubscribe
  }, [])

  async function createUser() {
      const db = getFirestore(app);
      const userData = {
        uid: auth.currentUser?.uid,
        username: email.split("@")[0],
        email: email,
        profilePicURL: "",
        posts: [],
        upvoters: [],
        downvoters: [],
        drives: [],
        createdAt: Date.now(),
      }
      await setDoc(doc(db, "users", auth.currentUser?.uid), userData)
      .then(async () => {
          await AsyncStorage.setItem('user',JSON.stringify(userData));
          console.log("User Created");
      });
  }

  async function getUser() {
    try {
        const db = getFirestore(app);
        const docRef = doc(db, "users", auth.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data()) 
        AsyncStorage.setItem('user', JSON.stringify(docSnap.data()));
    } catch (e) {
        console.log(e)
    }
  }
  
  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }
  //   AsyncStorage.setItem('user', JSON.stringify(data));
  //   setProfile(true)
  // }, [data]);

  const handleSignUp = () => {
      setProfileLoaded(false)
      createUserWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Registered with:', user.email);
          }).then(a => {
              createUser();
              console.log('Saved to firestore');
          }).catch(error =>{ 
            alert(error.message)
            setProfileLoaded(true)
          })
  }

  const handleLogin = () => {
      setProfileLoaded(false)
      signInWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
              const user = userCredentials.user;
              getUser();
              console.log('Logged in with:', user.email);
              setProfileLoaded(true)
              
          })
          .catch(error =>{ 
            alert(error.message)
            setProfileLoaded(true)
          })
          router.replace('../')
  }


  return (
   <>
   
       {profileLoaded?
        <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={[defaultStyles.inputField, { marginBottom: 10 }]}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />

      <TouchableOpacity onPress={handleLogin}  style={[defaultStyles.btn , { marginBottom: 20 }]}>
        <Text style={defaultStyles.btnText }>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp} style={styles.btnOutline1}>
        <Text style={styles.btnOutlineText1}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="md-logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>: <View style={styles.container}><ActivityIndicator style={{marginVertical:windowHeight/3}}/></View>}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  btnOutline1: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText1: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});



//   return (
//       <KeyboardAvoidingView
//           style={styles.container}
//           behavior="padding"
//       >
//           <View style={styles.inputContainer}>
//               <TextInput
//                   placeholder="Email"
//                   value={email}
//                   onChangeText={text => setEmail(text)}
//                   style={styles.input}
//               />
//               <TextInput
//                   placeholder="Password"
//                   value={password}
//                   onChangeText={text => setPassword(text)}
//                   style={styles.input}
//                   secureTextEntry
//               />
//           </View>

//           <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                   onPress={handleLogin}
//                   style={styles.button}
//               >
//                   <Text style={styles.buttonText}>Login</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                   onPress={handleSignUp}
//                   style={[styles.button, styles.buttonOutline]}
//               >
//                   <Text style={styles.buttonOutlineText}>Register</Text>
//               </TouchableOpacity>
//           </View>
//       </KeyboardAvoidingView>
//   )
// }

// export default LoginScreen

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//   },
//   inputContainer: {
//       width: '80%'
//   },
//   input: {
//       backgroundColor: 'white',
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       borderRadius: 10,
//       marginTop: 15,
//   },
//   buttonContainer: {
//       width: '60%',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 20,
//   },
//   button: {
//       backgroundColor: '#0782F9',
//       width: '100%',
//       padding: 15,
//       borderRadius: 10,
//       alignItems: 'center',
//   },
//   buttonOutline: {
//       backgroundColor: 'white',
//       marginTop: 5,
//       borderColor: '#0782F9',
//       borderWidth: 2,
//   },
//   buttonText: {
//       color: 'white',
//       fontWeight: '700',
//       fontSize: 16,
//   },
//   buttonOutlineText: {
//       color: '#0782F9',
//       fontWeight: '700',
//       fontSize: 16,
//   },
// })

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx


// enum Strategy {
//   Google = 'oauth_google',
//   Apple = 'oauth_apple',
//   Facebook = 'oauth_facebook',
// }

// const Page = () => {
//   useWarmUpBrowser();

//   
//   const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
//   const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
//   const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

//   const onSelectAuth = async (strategy: Strategy) => {
//     const selectedAuth = {
//       [Strategy.Google]: googleAuth,
//       [Strategy.Apple]: appleAuth,
//       [Strategy.Facebook]: facebookAuth,
//     }[strategy];

//     try {
//       const { createdSessionId, setActive } = await selectedAuth();

//       if (createdSessionId) {
//         setActive!({ session: createdSessionId });
//         router.back();
//       }
//     } catch (err) {
//       console.error('OAuth error', err);
//     }
//   };


