import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/colors';

interface Props {
  icon: string;
  temp: string;
  time: Date;
}

const ForecastCard = ({ icon, temp, time }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          resizeMethod="scale"
          resizeMode="contain"
          style={{
            height: 56,
            width: 56,
          }}
          source={{
            uri: icon,
          }}
        />
      </View>
      <Text style={styles.time}>
        {time.getHours() % 12 || 12}
        {time.getHours() < 12 || time.getHours() === 24 ? 'am' : 'pm'}
      </Text>
      <Text style={styles.temp}>{temp}°c</Text>
    </View>
  );
};

export default ForecastCard;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 8,
  },
  iconContainer: {
    height: 98,
    width: 98,
    borderRadius: 10,
    backgroundColor: COLORS.faintBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    color: COLORS.gray2,
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  temp: {
    color: COLORS.blue,
    fontSize: 32,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
});
