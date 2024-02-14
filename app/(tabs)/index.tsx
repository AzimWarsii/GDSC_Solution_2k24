import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';

const home = () => {
  return (
    <View>
     <Stack.Screen
        options={{
          header: () => <HomeHeader/>,
        }}
      />
    </View>
  )
}

export default home