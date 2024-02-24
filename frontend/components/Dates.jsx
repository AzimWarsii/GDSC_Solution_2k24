import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Dates({ dates }) {
  return (
    <View style={styles.dates}>
      {dates.map((date, i) => {
        return (
          <View key={date} style={styles.date}>
            <Text style={styles.genreText}>{date}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  date: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ccc',
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 9, 
    opacity: 0.4
  }
});