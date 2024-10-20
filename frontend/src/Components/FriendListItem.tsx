import { StyleSheet, View } from 'react-native';
import { Button, ListItem } from '@rneui/themed';

import ProfileImage from './ProfileImage';

function FrinendListItem(props: { userData: any, isRegistrable?: boolean }) {
	return (
		<ListItem bottomDivider style={{ paddingLeft: 5 }}>
			<ProfileImage
				size={55}
				friendData={props.userData}
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

			{props.isRegistrable && (
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
					onPress={() => console.log('aye')}
				/>
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