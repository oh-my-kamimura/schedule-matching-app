import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

function BackButton(props: { route: string }) {
	return (
		// TODO: back()ではうまくいかない原因を特定する。
		// TODO: 遷移する際のアニメーションを追加する。
		<TouchableOpacity onPress={() => { router.replace(props.route); }} style={styles.button}>
			<Icon
				name="arrow-back"
				color={"#4B8687"}
				size={25}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: 52,
		left: 25,
		padding: 10
	}
})

export default BackButton;