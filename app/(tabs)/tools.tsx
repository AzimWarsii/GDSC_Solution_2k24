import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import ToolHeader from '@/components/ToolHeader'
import ToolListings from '@/components/ToolListings'

export default function tools() {
  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
      <Stack.Screen
        options={{
          header: () => <ToolHeader/>,
        }}
      />
      <ToolListings/>
    </View>
  )
}