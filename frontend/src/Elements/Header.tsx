import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LogOutButton from '../Components/LogOutButton';

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
			<View style={styles.headerInner}>
				<Text style={ styles.leftText }>
					{left}
				</Text>
				<Text
					style={ styles.headerTitle }>
					{title ?? ''}
				</Text>
				<Text style={ styles.rightText }>
					{right ?? <LogOutButton/>}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: 100,
		justifyContent: 'flex-end',
		backgroundColor: '#ffffff',
		borderBottomColor: '#888888',
		borderBottomWidth: 0.3,
	},
	headerInner: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerTitle: {
		flex: 0.54,
		marginBottom: 14,
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 18,
		color: '#4B8687'
	},
	leftText: {
		flex: 0.23,
		marginBottom: 8,
		textAlign: 'center',
		fontSize: 14,
		color: 'rgba(0,0,0,0.5)'
	},
	rightText: {
		flex: 0.23,
		marginBottom: 8,
		textAlign: 'center',
		fontSize: 14,
		color: 'rgba(0,0,0,0.5)'
	}
});

export default Header;
