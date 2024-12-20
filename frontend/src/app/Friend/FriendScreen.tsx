import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import Header from '../../Elements/Header';
import { ListItem } from '@rneui/themed';
import { useRecoilState } from 'recoil';
import { Tab, TabView } from '@rneui/themed';

import ProfileImage from '../../Components/ProfileImage';
import { userDataAtom } from '../../Recoil/Atom/userDataAtom';
import FriendListItem from '../../Components/FriendListItem';
import { SearchBar } from '@rneui/themed';
import { db } from '../../config';
import { fetchFriendInDatabase } from '../../Services/accountService';
import { FirebaseError } from 'firebase/app';

function FriendScreen() {
	const [userData, setUserData] = useRecoilState(userDataAtom);
	const [index, setIndex] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [friendsResults, setFriendsResults] = useState<any[]>([])
	const [notFriendsResults, setNotFriendsResults] = useState<any[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	const searchUsers = async () => {
		const searchFriendsResults = await fetchFriendInDatabase(searchText, userData.friendsList);
		if (searchFriendsResults instanceof FirebaseError) {
			return;
		}
		setFriendsResults(searchFriendsResults)

		const searchNotFriendsResults = await fetchFriendInDatabase(searchText);
		if (searchNotFriendsResults instanceof FirebaseError) {
			return;
		}
		setNotFriendsResults(searchNotFriendsResults)
	};

	useEffect(() => {
		searchUsers();
	}, [searchText]);

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
						friendData={userData}
					/>
				</ListItem>

				<SearchBar
					placeholder="表示名を入力してください。"
					onChangeText={(text) => setSearchText(text)}
					value={searchText}
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
						title={`一覧 (${userData.friendsList.length})`}
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
					{/* 一覧タブ */}
					<TabView.Item style={{ width: '100%' }}>
						<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={searchUsers} />}>
							{friendsResults.length > 0 ? (
								friendsResults.map((result, index) => (
									<FriendListItem
										key={index}
										friendData={result}
										isRegistrable={true}
									/>
								))
							) : (
								searchText === '' ? (
									<Text style={styles.searchTextNone}>登録しているフレンドがいません。</Text>
								) : (
									<Text style={styles.searchTextNone}>検索条件に合致するフレンドがいません。</Text>
								)
							)}
						</ScrollView>
					</TabView.Item>
					{/* 検索タブ */}
					<TabView.Item style={{ width: '100%' }}>
						<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={searchUsers} />}>
							{notFriendsResults.length > 0 ? (
								notFriendsResults.map((result, index) => (
									<FriendListItem
										key={index}
										friendData={result}
										isRegistrable={true}
									/>
								))
							) : (
								searchText === '' ? (
									<Text style={styles.searchTextNone}>
										ユーザを検索してフレンド登録することができます。{"\n"}
										表示名を入力してください。
									</Text>
								) : (
									<Text style={styles.searchResultsNone}>
										検索結果がありません。
									</Text>
								)
							)}
						</ScrollView>
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
	},
	searchTextNone: {
		marginTop: 50,
		verticalAlign: 'middle',
		textAlign: 'center',
		fontSize: 13,
		lineHeight: 24,
	},
	searchResultsNone: {
		marginTop: 60,
		verticalAlign: 'middle',
		textAlign: 'center',
		fontSize: 13,
		lineHeight: 24,

	}
});

export default FriendScreen