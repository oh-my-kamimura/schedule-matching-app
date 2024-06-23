import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
	/** ヘッダに表示するタイトル */
	title: string;
	/** ヘッダ左側の要素 */
	left?: React.ReactNode;
	/** ヘッダ右側の要素 */
	right?: React.ReactNode;
};

/**
 * オリジナルのヘッダコンポーネント
 * @param props
 * @returns
 */
const Header: React.FC<Props> = props => {
	const { title, left, right } = props;
	return (
		<View style={styles.header}>
			<View style={{ flex: 0.25 }}>{left}</View>
			<Text
				style={ styles.headerText }>
				{title ?? ''}
			</Text>
			<View style={{ flex: 0.25 }}>{right}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		borderBottomColor: '#888888',
		borderBottomWidth: 0.3,
	},
	headerText: {
		flex: 1,
		textAlign: 'center',
		alignItems: 'center',
		fontWeight: '700',
		fontSize: 18,
		color: '#4B8687'
	}
});

export default Header;
