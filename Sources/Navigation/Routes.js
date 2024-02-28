import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavConfigs, NavRoutes } from './index';
import { BarcodeInput, Login, PhotoUpload, UploadSuccess } from '../Screens';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
        <Stack.Screen
          name={NavRoutes.Login}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={NavRoutes.BarcodeInput} component={BarcodeInput} />
        <Stack.Screen name={NavRoutes.PhotoUpload} component={PhotoUpload} />
        <Stack.Screen
          name={NavRoutes.UploadSuccess}
          component={UploadSuccess}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
