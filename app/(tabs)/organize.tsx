import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'
import OrganizePage from '@/components/OrganizePage'

export default function organize() {
  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
      <Stack.Screen
        options={{
          header: () => <Header/>,
        }}
      />
      <OrganizePage/>
    </View>
  )
}