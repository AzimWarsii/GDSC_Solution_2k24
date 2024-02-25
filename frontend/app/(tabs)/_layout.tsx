import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Header from '@/components/Header'

const Layout = () => {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarShowLabel:true,
        tabBarStyle:{
          backgroundColor:'#fff',
        },
        tabBarLabelStyle: {
          fontFamily: 'mon-sb',
        },
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
          tabBarLabel: 'Drives',
          headerShown: true,
          header: () => <Header/>,      
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
