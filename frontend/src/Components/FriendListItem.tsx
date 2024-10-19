import { StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';

import ProfileImage from './ProfileImage';

function FrinendListItem(props: {userData: any}) {
	return (
		<ListItem bottomDivider>
			<ProfileImage
				size={40}
			/>
			<ListItem.Content style={styles.listContent}>
				<ListItem.Title style={styles.listTitle}>
					{props.userData.userName}
				</ListItem.Title>
				<ListItem.Subtitle style={styles.listSubTitle}>
					{/* TODO: 備考欄に変更予定 */}
					{props.userData.email}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	)
}

const styles = StyleSheet.create({
	listContent: {
		height: 40,
		paddingLeft: 5
	},
	listTitle:{
		fontWeight: 'bold',
		marginBottom: 5,
		fontSize: 14
	},
	listSubTitle: {
		fontSize: 12
	}
})

export default FrinendListItem;