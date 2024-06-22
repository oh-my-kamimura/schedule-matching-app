import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../Screens/Calendar/Calendar';
import MatchingScreen from '../Screens/Matching/Matching';
import FriendScreen from '../Screens/Friend/Friend';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
	return (
		<Tab.Navigator initialRouteName='Matching'>
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
				options={{ title: '友達登録' }} />
		</Tab.Navigator>
	);
};

export default TabNavigator;
