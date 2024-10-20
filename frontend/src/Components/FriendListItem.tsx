import { Alert, StyleSheet, View } from 'react-native';
import { Button, ListItem } from '@rneui/themed';
import { useRecoilState } from 'recoil';

import ProfileImage from './ProfileImage';
import { userDataAtom } from '../Recoil/Atom/userDataAtom';
import { addFriendInDatabase, removeFriendInDatabase } from '../Services/accountService';

function FrinendListItem(props: { friendData: any, isRegistrable?: boolean }) {
	const [userData, setUserData] = useRecoilState(userDataAtom);

	const addFriend = async () => {
		console.log('props.friendData.uid', props.friendData.uid);
		await addFriendInDatabase(props.friendData.uid);
		await setUserData((prevState) => ({
			...prevState,
			friendsList: [...prevState.friendsList, props.friendData.uid]
		}));
		console.log(userData);
	}

	const removeFriend = async () => {
		Alert.alert(
			'フレンド登録を解除しますか？',
			'',
			[
				{
					text: "はい",
					onPress: async () => {
						console.log("はいが選択されました")
						await removeFriendInDatabase(props.friendData.uid);
						setUserData((prevState) => ({
							...prevState,
							friendsList: prevState.friendsList.filter((friend) => friend !== props.friendData.uid)
						}));
					},
				},
				{
					text: "いいえ",
					onPress: () => console.log("いいえが選択されました"),
					style: "cancel",
				},
			],
			{ cancelable: false }
		);
		console.log("友達登録を解除します。");
		
	}

	return (
		<ListItem bottomDivider style={{ paddingLeft: 5 }}>
			<ProfileImage
				size={55}
				friendData={props.friendData}
			/>
			<ListItem.Content style={styles.listContent}>
				<ListItem.Title style={styles.listTitle}>
					{props.friendData.userName}
				</ListItem.Title>
				<ListItem.Subtitle style={styles.listSubTitle}>
					{/* TODO: 備考欄に変更予定 */}
					{props.friendData.email}
				</ListItem.Subtitle>
			</ListItem.Content>

			{props.isRegistrable && (
				!userData.friendsList.includes(props.friendData.uid) ? (
				<Button
					title="登録する"
					loading={false}
					loadingProps={{ size: 'small', color: 'white' }}
					buttonStyle={{
						backgroundColor: '#EB8434',
						borderRadius: 7,
						height: '100%',
						width: '100%',
						marginVertical: 'auto'
					}}
					titleStyle={{ fontWeight: 'bold', fontSize: 12, lineHeight: 12 }}
					containerStyle={{
						marginHorizontal: 10,
						height: 42,
						padding: 5,
						width: 110,
					}}
					onPress={() => addFriend()}
				/>
				) : (
					<Button
					title="登録済み"
					loading={false}
					loadingProps={{ size: 'small', color: 'white' }}
					buttonStyle={{
						backgroundColor: 'white',
						borderColor: '#EB8434',
						borderWidth: 2,
						borderRadius: 7,
						height: '100%',
						width: '100%',
						marginVertical: 'auto', 
					}}
					titleStyle={{ fontWeight: 'bold', fontSize: 12, lineHeight: 12, color: '#EB8434' }}
					containerStyle={{
						marginHorizontal: 10,
						height: 42,
						padding: 5,
						width: 110,
					}}
					onPress={() => removeFriend()}
				/>	
				)
			)}
		</ListItem>
	)
}

const styles = StyleSheet.create({
	listContent: {
		height: 45,
		paddingLeft: 0
	},
	listTitle: {
		fontWeight: 'bold',
		marginBottom: 5,
		fontSize: 15
	},
	listSubTitle: {
		fontSize: 12
	}
})

export default FrinendListItem;