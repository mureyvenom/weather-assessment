import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../utils/colors';
import Geolocation from '@react-native-community/geolocation';
import weatherApi from '../utils/weatherApi';
import { ForecastResponse, WeatherResponse } from '../utils/types';
import ForecastCard from '../components/ForecastCard';

const MainScreen = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<WeatherResponse>();
  const [forecast, setForecast] = useState<ForecastResponse>();

  const fetchWeatherResults = useCallback(
    async (longitude: number, latitude: number) => {
      setHasError(false);
      setLoading(true);
      try {
        const response = await weatherApi.get('weather', {
          params: {
            lon: longitude,
            lat: latitude,
          },
        });
        const forecastResponse = await weatherApi.get('forecast', {
          params: {
            lon: longitude,
            lat: latitude,
          },
        });
        setResult(response.data);
        setForecast(forecastResponse.data);
        setLoading(false);
        setHasError(false);
      } catch (error) {
        setLoading(false);
        setHasError(true);
        Alert.alert(
          'Error',
          'Something went wrong while getting weather results',
        );
      }
    },
    [],
  );

  const getLocation = useCallback(() => {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(pos => {
      fetchWeatherResults(pos.coords.longitude, pos.coords.latitude);
    });
  }, [fetchWeatherResults]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  if (hasError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: COLORS.blue,
              borderRadius: 5,
              height: 45,
              paddingHorizontal: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff', fontFamily: 'DMSans-Bold' }}>
              Retry
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="menu" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.mainBody}>
          <View style={styles.padded}>
            <Text style={styles.todayText}>Today</Text>
            <Text style={styles.mainTemp}>
              {result?.main.temp.toFixed(0)}°C
            </Text>
            <View style={styles.weatherView}>
              <View>
                <Text style={styles.weatherTitle}>
                  {result?.weather[0].main}
                </Text>
                <Text style={styles.weatherSubtitle}>
                  {result?.weather[0].description}
                </Text>
              </View>
              <View
                style={{
                  height: 100,
                  width: 100,
                }}>
                {result?.weather[0] && (
                  <Image
                    resizeMethod="scale"
                    resizeMode="contain"
                    style={{
                      height: '100%',
                    }}
                    source={{
                      uri: `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <View>
            <ScrollView horizontal>
              {forecast?.list
                .filter(
                  f => new Date(f.dt * 1000).getDate() === new Date().getDate(),
                )
                .map(f => {
                  return (
                    <ForecastCard
                      key={f.dt}
                      icon={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                      temp={f.main.temp.toFixed()}
                      time={new Date(f.dt * 1000)}
                    />
                  );
                })}
            </ScrollView>
            <View style={styles.pressureContainer}>
              <View style={styles.pressureCard}>
                <Text style={styles.pressureText}>Pressure</Text>
                <Text
                  style={[
                    styles.pressureText,
                    {
                      marginHorizontal: 4,
                    },
                  ]}>
                  |
                </Text>
                <Text
                  style={[styles.pressureText, { fontFamily: 'DMSans-Bold' }]}>
                  30
                </Text>
                <Text style={styles.pressureText}>hPa</Text>
              </View>
              <View style={styles.pressureCard}>
                <Text style={styles.pressureText}>Humidity</Text>
                <Text
                  style={[
                    styles.pressureText,
                    {
                      marginHorizontal: 4,
                    },
                  ]}>
                  |
                </Text>
                <Text
                  style={[styles.pressureText, { fontFamily: 'DMSans-Bold' }]}>
                  10%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  todayText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Regular',
    marginBottom: 18,
  },
  padded: {
    paddingHorizontal: 16,
  },
  mainTemp: {
    color: COLORS.blue,
    fontFamily: 'DMSans-Bold',
    fontSize: 96,
  },
  weatherTitle: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#000',
  },
  weatherSubtitle: {
    fontSize: 14,
    color: COLORS.gray2,
    fontFamily: 'DMSans-Regular',
    textTransform: 'capitalize',
  },
  weatherView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pressureContainer: {
    marginVertical: 44,
    flexDirection: 'row',
  },
  pressureCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  pressureText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 18,
  },
});
