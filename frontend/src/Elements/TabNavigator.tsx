import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../Screens/Calendar/CalendarScreen';
import MatchingScreen from '../Screens/Matching/MatchingScreen';
import FriendScreen from '../Screens/Friend/FriendScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
	return (
		<Tab.Navigator 
			screenOptions={{ 
				headerShown: false,
				tabBarLabelStyle: styles.tabLabel,
				tabBarActiveTintColor: '#4B8687',
				tabBarInactiveTintColor: '#9E9E9E'
			}} 
			initialRouteName='Matching'>
			<Tab.Screen
				name="Calendar"
				component={CalendarScreen}
				options={{ 
					title: 'カレンダー',
					tabBarIcon: ({ focused }) => <Icon name="calendar" color={focused ? "#4B8687" : "#9E9E9E"} size={20}/>
				 }} />
			<Tab.Screen
				name="Matching"
				component={MatchingScreen}
				options={{ 
					title: '日程調整', 
					tabBarIcon: ({ focused }) => <Icon name="handshake-o" color={focused ? "#4B8687" : "#9E9E9E"} size={20}/>
				}} />
			<Tab.Screen
				name="Friend"
				component={FriendScreen}
				options={{ 
					title: 'フレンド一覧' ,
					tabBarIcon: ({ focused }) => <Icon name="address-book-o" color={focused ? "#4B8687" : "#9E9E9E"} size={20}/>
				}} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabLabel: {
		
	}
});

export default TabNavigator;
