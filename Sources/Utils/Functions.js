import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';

const openGallery = async () => {
  const photo = await ImageCropPicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    mediaType: 'photo',
  });
  return photo;
};

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
  setAppData,
  getAppData,
  openGallery,
};

export default Functions;
