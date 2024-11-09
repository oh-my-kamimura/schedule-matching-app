import React, { useCallback, useMemo } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarItem from '../Types/CalendarItem';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';

const width = Dimensions.get('window').width;

export const CELL_HEIGHT = 12;

const MAX_EVENTS = 5;
const CELL_ITEM_PADDING = 2;
const CELL_RADIUS = 3;

type Props = DayProps & {
  date?: DateData | undefined;
  eventItems: Map<string, CalendarItem[]>;
  cellMinHeight: number;
};

export const ScheduleCalendarDayItem = (props: Props) => {
  const { date, eventItems: dayItems, children, state, cellMinHeight, onPress } = props;

  const events = useMemo(
    () => (dayItems.get((date as DateData).dateString) ?? []).sort((a, b) => b.index - a.index),
    [date, dayItems],
  );

  const renderEvent = useCallback((v: CalendarItem, i: number) => {
    const borderLeft = v.type == 'start' || v.type == 'all' ? CELL_RADIUS : 0; // 表示タイプが予定開始日または全日の場合は、左枠線を曲げる
    const borderRight = v.type == 'end' || v.type == 'all' ? CELL_RADIUS : 0; // 表示タイプが予定終了日または全日の場合は、右枠線を曲げる
    return (
      <View
        key={`${v.id} - ${i}`}
        style={[
          styles.event,
          {
            backgroundColor: v.color,
            top: v.index * (CELL_HEIGHT + CELL_ITEM_PADDING), // 並び順の位置で表示させる
            borderTopLeftRadius: borderLeft,
            borderBottomLeftRadius: borderLeft,
            borderTopRightRadius: borderRight,
            borderBottomRightRadius: borderRight,
          },
        ]}
      >
        {v.type == 'start' || v.type == 'all' ? (
          <View style={styles.eventRow}>
            <Text style={styles.eventText} numberOfLines={1}>
              {v.text}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          minHeight: cellMinHeight,
          maxWidth: MAX_EVENTS * CELL_HEIGHT + CELL_ITEM_PADDING,
          opacity: state == 'disabled' ? 0.4 : 1,
        },
      ]}
      onPress={() => onPress?.(date)}
    >
      <Text 
        style={[styles.dayText, 
          state == 'today' && styles.todayText, 
          state == 'selected' && styles.selectedText]}
        >
          {children}
        </Text>
      <View>{events.map((event, i) => renderEvent(event, i))}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '100%',
  },
  dayText: {
    textAlign: 'center',
    marginBottom: CELL_ITEM_PADDING,
  },
  todayText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'white',
    backgroundColor: 'orange',
    borderRadius: 20,
  },
  event: {
    width: '99%',
    height: CELL_HEIGHT,
    borderRadius: CELL_RADIUS,
    position: 'absolute',
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    paddingLeft: 2,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
});