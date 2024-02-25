import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ClerkProvider, useAuth , useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ModalHeaderText from '@/components/ModalHeaderText';
import { TouchableOpacity } from 'react-native';
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY||null;
// Cache the Clerk JWT
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/OpenSans-Regular.ttf'),
    'mon-sb': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/OpenSans-Bold.ttf'),
  });

  

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn ,getToken } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  // Automatically open login if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');
    }
    
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
    const signInWithClerk = async () => {
    try{ 
      const auth = getAuth();
      const token = await getToken({ template: "integration_firebase" });
      const newUser = await signInWithCustomToken(auth , token);
      console.log("user ::",user.imageUrl);
      const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
        AsyncStorage.setItem('user', JSON.stringify(userDoc));
			 }else {
				// signup
				const userData = {
          uid: user.id,
          username: user.firstName,
          email: user.emailAddresses[0].emailAddress,
          profilePicURL: user.imageUrl,
          posts: [],
          upvoters: [],
          downvoters: [],
          drives: [],
          createdAt: Date.now(),
        }
        await setDoc(doc(firestore, "users", newUser.user.uid), userData)
        .then(async () => {
            await AsyncStorage.setItem('user',JSON.stringify(userData));
            console.log("User Created");
        });

			}
		} catch (error) {
			alert(error);
		}    
    };
 
    signInWithClerk();
  }
  }, [isSignedIn]);



  return (
    <Stack>
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'Log in or Sign up',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
     
    </Stack>
  );
}
