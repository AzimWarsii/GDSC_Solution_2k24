import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'

export default function wiki() {
  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
      <Stack.Screen
        options={{
          header: () => <Header/>,
        }}
      />
    </View>
  )
}