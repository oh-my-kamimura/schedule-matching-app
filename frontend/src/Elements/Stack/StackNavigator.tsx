import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import TabNavigator from '../TabNavigator';
import DetailScreen from '../../Screens/Calendar/Detail';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;