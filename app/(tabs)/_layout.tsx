import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Layout = () => {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarShowLabel:true,
        // tabBarStyle:{
        //   position:'absolute',
        //   bottom :8 , 
        //   marginLeft : 10,
        //   marginRight:10,
        //   elevation:0,
        //   backgroundColor:'#000',
        //   borderRadius:15,
        //   height:60,  
        // },
        // tabBarLabelStyle: {
        //   fontFamily: 'mon-sb',
        // },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        
        options={{
          tabBarLabel: 'Tools',
          headerShown: true,
          tabBarIcon: ({ size, color }) => (
           <MaterialCommunityIcons name="hammer" size={size+2} color={color} />
         ),
        }}
      />
      <Tabs.Screen
        name="organize"
        options={{
          tabBarLabel: 'Organize',
          headerShown: true,
         tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="briefcase" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wiki"
        options={{
          tabBarLabel: 'Wiki',

          headerShown: true,
          tabBarIcon : ({ size, color }) => (
           <Ionicons name="bulb" size={size+2} color={color} />
         ),
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          tabBarLabel: 'Market',

          headerShown: true,
          tabBarIcon: ({ size, color }) => (
           <Ionicons name="pricetags" size={size+2} color={color} />
         ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
