import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../../Elements/Header';
import { ListItem } from '@rneui/themed';
import { useRecoilState } from 'recoil';

import ProfileImage from '../../Components/ProfileImage';
import { userDataAtom } from '../../Recoil/Atom/userDataAtom';

function FriendScreen() {
	const [userData, setUserData] = useRecoilState(userDataAtom);

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
							{userData.email}
						</ListItem.Subtitle>
					</ListItem.Content>
					<ProfileImage
						size={60}
					/>
				</ListItem>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ddd',
	},
});

export default FriendScreen