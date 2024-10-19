import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '../../Elements/Header';
import { ListItem } from '@rneui/themed';
import { useRecoilState } from 'recoil';
import { Tab, TabView } from '@rneui/themed';
import { collection, query, getDocs, where } from 'firebase/firestore';

import ProfileImage from '../../Components/ProfileImage';
import { userDataAtom } from '../../Recoil/Atom/userDataAtom';
import FriendListItem from '../../Components/FriendListItem';
import { SearchBar } from '@rneui/themed';
import { db } from '../../config';

function FriendScreen() {
	const [userData, setUserData] = useRecoilState(userDataAtom);
	const [index, setIndex] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [results, setResults] = useState<any[]>([]);

	const searchUsers = async (searchText: any) => {
		if (searchText.trim() === '') {
			setResults([]);
			return;
		}

		try {
			const ref = collection(db, "users");
			const q = query(ref, 
				where('userName', '>=', searchText), 
				where('userName', '<=', searchText + '\uf8ff')
			);
			const snapshot = await getDocs(q);
			const users = snapshot.docs.map((doc) => doc.data());
			console.log(users);
			setResults(users);
		} catch (error) {
			console.error('Error searching users: ', error);
		}
	};

	useEffect(() => {
		searchUsers(searchText);
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
					{/* 一覧タブ */}
					<TabView.Item style={{ width: '100%' }}>
						<ScrollView>
							<FriendListItem userData={userData}></FriendListItem>
							<FriendListItem userData={userData}></FriendListItem>
						</ScrollView>
					</TabView.Item>
					{/* 検索タブ */}
					<TabView.Item style={{ width: '100%' }}>
						<ScrollView>
						{results && results.map((result, index) => (
							<FriendListItem key={index} userData={result} />
						))}
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
	}
});

export default FriendScreen