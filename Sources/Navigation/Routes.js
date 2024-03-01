import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavConfigs, NavRoutes } from './index';
import {
  BarcodeInput,
  Login,
  PhotoUpload,
  ScanBarcode,
  TakePhoto,
  UploadSuccess,
} from '../Screens';
import { useLocalStorage } from '../Hooks';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const Routes = () => {
  const { localdata } = useLocalStorage();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 200);
  }, []);

  const Screens = useCallback(() => {
    console.log('Screens called......');
    return (
      <Stack.Navigator
        initialRouteName={
          localdata?.user ? NavRoutes.BarcodeInput : NavRoutes.Login
        }
        screenOptions={NavConfigs.screenOptions}>
        <Stack.Screen name={NavRoutes.Login} component={Login} />
        <Stack.Screen name={NavRoutes.BarcodeInput} component={BarcodeInput} />
        <Stack.Screen name={NavRoutes.ScanBarcode} component={ScanBarcode} />
        <Stack.Screen name={NavRoutes.PhotoUpload} component={PhotoUpload} />
        <Stack.Screen name={NavRoutes.TakePhoto} component={TakePhoto} />
        <Stack.Screen
          name={NavRoutes.UploadSuccess}
          component={UploadSuccess}
        />
      </Stack.Navigator>
    );
  }, [localdata?.user]);

  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  );
};

export default Routes;
