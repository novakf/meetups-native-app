import { registerRootComponent } from 'expo'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import SpeakerScreen from './screens/SpeakerScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Speaker" component={SpeakerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

registerRootComponent(App)
