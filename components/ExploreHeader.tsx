import { View, Text, SafeAreaView,Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { app, auth , firestore } from '../firebase/firebase';

const categories = [
  {
    name: 'Food',
    icon: 'home',
  },
  {
    name: 'Events',
    icon: 'house-siding',
  },
  {
    name: 'Random',
    icon: 'local-fire-department',
  },
  {
    name: 'Editors Choice',
    icon: 'videogame-asset',
  },
  {
    name: 'Games',
    icon: 'apartment',
  },
  {
    name: 'Activities',
    icon: 'beach-access',
  },
  {
    name: 'Culture',
    icon: 'nature-people',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}


const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const { user } = useUser();
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: 10 }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
        {(user)?
          <Link href={`/user/page`} asChild>
            <TouchableOpacity style={styles.filterBtn}>
              <Image  source={{ uri: user?.imageUrl }} style={styles.avatar}  />
            </TouchableOpacity>
          </Link>
          :
          <Link href={`/user/page`} asChild>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="person-circle-outline" size={30} color={'#A2A0A2'} />
            </TouchableOpacity>
          </Link>
          }
          <Text style={styles.logo}>Seahorse</Text>
          {(auth)&& 
          <Link href={`/add/page`} asChild>
            <TouchableOpacity style={styles.filterBtn1}>
              <Ionicons size={30} name="add-outline"/> 
            </TouchableOpacity>
          </Link>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    height: 80,
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
    marginTop:10,
    fontFamily:'mon-b',
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
    top:40,
    //borderWidth: 1,
   // borderColor: '#A2A0A2',
    //borderRadius: 24,
  },
  filterBtn1: {
    position:'absolute',

    left:20,
    top:40,
    //borderWidth: 1,
   // borderColor: '#A2A0A2',
    //borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
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
    backgroundColor: Colors.grey,
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

export default ExploreHeader;
