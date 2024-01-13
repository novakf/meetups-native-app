import React from 'react'
import { registerRootComponent } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './screens/MainScreen'
import SpeakerScreen from './screens/SpeakerScreen'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import Header from './components/Header'
import { PersistGate } from 'redux-persist/integration/react'

const Stack = createNativeStackNavigator()

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
}

registerRootComponent(App)
