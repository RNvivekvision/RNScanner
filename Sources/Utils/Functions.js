import { ActionSheetIOS, Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);
const Options = ({ onPress }) => {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Camera', 'Gallery'],
        cancelButtonIndex: 0,
      },
      idx => onPress?.(idx),
    );
  } else {
    Alert.alert(
      'Add Photo!',
      'Do you want to take a new photo using camera or choose from the gallery?',
      [
        {
          text: 'Cancle',
          onPress: () => onPress?.(0),
          style: 'destructive',
        },
        { text: 'Camera', onPress: () => onPress?.(1) },
        { text: 'Gallery', onPress: () => onPress?.(2) },
      ],
    );
  }
};

const OpenUrl = url => Linking.openURL(url);

const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
};

const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};

const Functions = {
  ALERT,
  OpenUrl,
  setAppData,
  getAppData,
  Options,
};

export default Functions;
