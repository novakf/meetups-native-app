import React from 'react'
import { Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'

type Props = {
  navigation: NavigationProp<any, any>
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <div>
      Main
      <Button title="Go to speaker" onPress={() => navigation.navigate('Speaker')} />
    </div>
  )
}

export default MainScreen
