import { View, Text, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';

import { selectedDayAtom } from '../Recoil/Atom/selectedDayAtom';

function ScheduleCalendarDayDetail() {
	const [selected, setSelected] = useRecoilState(selectedDayAtom);

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Text>{selected?.dateString}</Text>
			</View>
			<View style={styles.rightContainer}>
				<Text>右側のビュー</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderTopColor: 'gray',
		borderTopWidth: 1,
	},
	leftContainer: {
		flex: 1,
		height: '100%',
	},
	rightContainer: {
		flex: 3,
		height: '100%',
	},

})

export default ScheduleCalendarDayDetail;