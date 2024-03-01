import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { RNFloating, RNStyles } from '../Common';
import NoCameraPermission from './NoCameraPermission';

const CameraHandler = ({ onFloatingPress, onCodeFound }) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'code-128', 'code-39', 'code-93'],
    onCodeScanned: codes => {
      const code = codes[0]?.value;
      onCodeFound?.(code);
    },
  });

  return hasPermission ? (
    <View style={RNStyles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
      <View style={styles.overlay}>
        <RNFloating
          containerStyle={styles.floatingButton}
          onPress={onFloatingPress}
        />
      </View>
    </View>
  ) : (
    <NoCameraPermission />
  );
};

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
  },
  floatingButton: {
    alignSelf: 'center',
    right: null,
  },
});

export default CameraHandler;
