import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

function BackButton() {
	return (
		<TouchableOpacity>
			<Icon
				name="arrow-back"
				style={styles.back}
				color={"#4B8687"}
				size={25}
				onPress={() => {
					// TODO: back()ではうまくいかない原因を特定する。
					// TODO: 遷移する際のアニメーションを追加する。
					router.replace('');
				}}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	back: {
		// 適用する画面間で位置の差異が出ないように調整する。
		position: 'absolute',
		marginTop: 62,
		marginLeft: -152
	}
})

export default BackButton;