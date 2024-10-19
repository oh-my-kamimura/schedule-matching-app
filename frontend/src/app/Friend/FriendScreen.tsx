import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '../../Elements/Header';
import { ListItem } from '@rneui/themed';
import { useRecoilState } from 'recoil';
import { SearchBar, Tab, TabView } from '@rneui/themed';

import ProfileImage from '../../Components/ProfileImage';
import { userDataAtom } from '../../Recoil/Atom/userDataAtom';
import FrinendListItem from '../../Components/FriendListItem';

function FriendScreen() {
	const [userData, setUserData] = useRecoilState(userDataAtom);
	const [search, setSearch] = useState("");
	const [index, setIndex] = useState(0);

	return (
		<View style={{ flex: 1 }}>
			<Header title="フレンド一覧" />
			<View style={styles.container}>
				<ListItem bottomDivider>
					<ListItem.Content style={{ height: 65, paddingLeft: 5 }}>
						<ListItem.Title style={{ fontWeight: 'bold', marginBottom: 4 }}>
							{userData.userName}
						</ListItem.Title>
						<ListItem.Subtitle>
							{/* TODO: 備考欄に変更予定 */}
							{userData.email}
						</ListItem.Subtitle>
					</ListItem.Content>
					<ProfileImage
						size={60}
					/>
				</ListItem>

				<SearchBar
					placeholder="表示名, メールアドレスを入力してください。"
					onChangeText={(text) => setSearch(text)}
					value={search}
					lightTheme
					containerStyle={styles.searchContainer}
					inputContainerStyle={styles.searchInputContainer}
					inputStyle={styles.searchInput}
					round={true}
				/>
				<Tab
					value={index}
					onChange={(e) => setIndex(e)}
					indicatorStyle={{ backgroundColor: '#4B8687' }}
					variant="default"
					style={styles.tab}
				>
					<Tab.Item
						title="一覧"
						titleStyle={{
							fontSize: 12,
							color: index === 0 ? '#4B8687' : 'grey',
							fontWeight: index === 0 ? 'bold' : 'normal'
						}}
					/>
					<Tab.Item
						title="検索"
						titleStyle={{
							fontSize: 12,
							color: index === 1 ? '#4B8687' : 'grey',
							fontWeight: index === 1 ? 'bold' : 'normal'
						}}
					/>
				</Tab>

				<TabView value={index} onChange={setIndex} animationType="spring">
					<TabView.Item style={{ width: '100%' }}>
						<ScrollView>
							<FrinendListItem userData={userData}></FrinendListItem>
							<FrinendListItem userData={userData}></FrinendListItem>
						</ScrollView>
					</TabView.Item>
					<TabView.Item style={{ width: '100%' }}>
						<Text>新しくユーザ登録したい場合に使う画面</Text>
					</TabView.Item>
				</TabView>


			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	tab: {
		width: 200,
		alignSelf: 'flex-start',
		height: 40
	},
	searchContainer: {
		height: 50,
		backgroundColor: '#FFFFFF',
		borderBottomColor: 'white'
	},
	searchInputContainer: {
		height: 35,
		backgroundColor: '#E8E8E8'
	},
	searchInput: {
		fontSize: 14,
		color: '#333333'
	}
});

export default FriendScreen