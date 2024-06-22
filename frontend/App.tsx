import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

type RootStackParamList = {
  Calendar: undefined;
  Detail: undefined;
};

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

function HomeScreen() {
  return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Home" 
          component={CalendarScreen}/>
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}/>
      </Stack.Navigator>
  );
}

function CalendarScreen() {
  const navigation = useNavigation<CalendarScreenNavigationProp>();
  return(
    <View style={styles.container}>
      <Text>カレンダー画面です。</Text>
      <Button
        title="詳細へ"
        onPress={() => navigation.navigate('Detail')} 
      />
    </View>
  )
}

function DetailScreen() {
  return(
    <View style={styles.container}>
      <Text>日程の詳細画面です</Text>
    </View> 
  )
}

function MatchingScreen() {
  return(
    <View style={styles.container}>
      <Text>日程調整画面です</Text>
    </View> 
  )
}

function FriendScreen() {
  return(
    <View style={styles.container}>
      <Text>友達登録画面です</Text>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'カレンダー' }}/>
        <Tab.Screen 
          name="Matching" 
          component={MatchingScreen} 
          options={{ title: '日程調整' }}/>
        <Tab.Screen 
          name="Friend" 
          component={FriendScreen} 
          options={{ title: '友達登録' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}