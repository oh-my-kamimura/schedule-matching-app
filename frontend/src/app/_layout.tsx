import { Slot, Stack, Tabs } from 'expo-router'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { RecoilRoot } from 'recoil';

function Layout() {
	const [loaded, error] = useFonts({
		SFCompactRoundedMedium: require('../../assets/fonts/Potta One Regular.ttf')
	});

	return (
		<RecoilRoot>
			<PaperProvider>
				{/* <Stack /> */}
				{/* <Slot /> */}
				{/* TODO: タブを別ファイルで管理するように変更 */}
				<Tabs
					screenOptions={{
						headerShown: false,
						tabBarActiveTintColor: '#4B8687',
						tabBarInactiveTintColor: '#9E9E9E',
						tabBarStyle: { 
							backgroundColor: '#F5F5F5',
							borderTopColor: '#888888',
							borderTopWidth: 0.3,
						},
					}}>
					<Tabs.Screen
						name="Calendar/CalendarScreen"
						options={{
							title: 'カレンダー',
							tabBarIcon: ({ focused }) => <Icon name="calendar" color={focused ? "#4B8687" : "#9E9E9E"} size={20} />
						}} />
					<Tabs.Screen
						name="Matching/MatchingScreen"
						options={{
							title: '日程調整',
							tabBarIcon: ({ focused }) => <Icon name="handshake-o" color={focused ? "#4B8687" : "#9E9E9E"} size={20} />
						}} />
					<Tabs.Screen
						name="Friend/FriendScreen"
						options={{
							title: 'フレンド一覧',
							tabBarIcon: ({ focused }) => <Icon name="address-book-o" color={focused ? "#4B8687" : "#9E9E9E"} size={20} />
						}} />
					<Tabs.Screen
						name="index"
						options={{
							href: null,
							tabBarStyle: { display: 'none' }
						}} />
					<Tabs.Screen
						name="Auth/SignUpScreen"
						options={{
							href: null,
							tabBarStyle: { display: 'none' }
						}} />
					<Tabs.Screen
						name="Auth/LogInScreen"
						options={{
							href: null,
							tabBarStyle: { display: 'none' }
						}} />
					<Tabs.Screen
						name="Calendar/DetailScreen"
						options={{ href: null }} />
					<Tabs.Screen
						name="Calendar/AddScheduleScreen"
						options={{ href: null }} />
				</Tabs>
			</PaperProvider>
		</RecoilRoot>
	)
}

export default Layout