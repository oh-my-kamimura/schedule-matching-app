import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../Screens/Calendar/Calendar';
import MatchingScreen from '../Screens/Matching/Matching';
import FriendScreen from '../Screens/Friend/Friend';

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
				options={{ title: 'カレンダー' }} />
			<Tab.Screen
				name="Matching"
				component={MatchingScreen}
				options={{ title: '日程調整' }} />
			<Tab.Screen
				name="Friend"
				component={FriendScreen}
				options={{ title: 'フレンド一覧' }} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabLabel: {
		color: '#4B8687',
	}
});

export default TabNavigator;
