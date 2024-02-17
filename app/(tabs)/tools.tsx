import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'
import ToolListings from '@/components/ToolListings'

export default function tools() {
  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
      <Stack.Screen
        options={{
          header: () => <Header/>,
        }}
      />
      <ToolListings/>
    </View>
  )
}