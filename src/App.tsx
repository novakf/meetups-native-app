import React from 'react'
import { registerRootComponent } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './screens/MainScreen'
import SpeakerScreen from './screens/SpeakerScreen'
import { Provider } from 'react-redux'
import { store } from './store'
import Header from './components/Header'

const Stack = createNativeStackNavigator()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} options={{ headerTitle: () => <Header /> }} />
          <Stack.Screen
            name="Speaker"
            component={SpeakerScreen}
            options={{ headerTitle: () => <Header />, headerLeft: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

registerRootComponent(App)
