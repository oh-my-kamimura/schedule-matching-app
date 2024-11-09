import { View, Text, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';

import { selectedDayAtom } from '../Recoil/Atom/selectedDayAtom';
import CalendarItem from '../Types/CalendarItem';


function ScheduleCalendarDayDetail(props: {eventItems: Map<string, CalendarItem[]>}) {
	const [selected, setSelected] = useRecoilState(selectedDayAtom);

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Text>{selected?.dateString}</Text>
			</View>
			<View style={styles.rightContainer}>
				{selected && props.eventItems.get(selected.dateString)?.map((item, index) => (
					<View style={[
						styles.eventItem,
						{ backgroundColor: item.color }
					]}>
						<Text style={{color: 'white'}}>
							{item.text}, {item.type}
						</Text>
					</View>
				))}
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
	eventItem: {
		borderRadius: 5,
		marginTop: 3,
		padding: 2
	}

})

export default ScheduleCalendarDayDetail;