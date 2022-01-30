import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store';
import Tabs from './navigation/tabs';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Home Screen' component={Tabs} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  );
}
