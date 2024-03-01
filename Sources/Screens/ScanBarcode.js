import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { RNFloating, RNHeader, RNStyles } from '../Common';
import { NoCameraPermission } from '../Components';
import { Strings } from '../Constants';
import { NavRoutes } from '../Navigation';
import { useIsFocused } from '@react-navigation/native';

const ScanBarcode = ({ navigation }) => {
  const [State, setState] = useState({ code: null, isLoading: false });
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();

  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    requestPermission();
    return () => setState(p => ({ ...p, code: null }));
  }, []);

  const codeScanner = {
    codeTypes: [
      'qr',
      'code-128',
      'code-39',
      'code-93',
      'ean-13',
      'ean-8',
      'codabar',
      'itf',
      'pdf-417',
      'upc-e',
    ],
    onCodeScanned: codes => {
      const code = codes[0]?.value;
      if (!State.isLoading) {
        console.log('called.....');
        setState(p => ({ ...p, code: code }));
      }
    },
  };

  const onPress = async () => {
    setState(p => ({ ...p, isLoading: true }));
    await navigation.replace(NavRoutes.PhotoUpload, { code: State.code });
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.ScanBarCode} />

      {hasPermission ? (
        <View style={RNStyles.container}>
          <Camera
            style={styles.camera}
            device={device}
            isActive={isFocused}
            codeScanner={codeScanner}
          />
          <View style={styles.overlay}>
            {State.code && (
              <RNFloating
                containerStyle={styles.floatingButton}
                onPress={onPress}
              />
            )}
          </View>
        </View>
      ) : (
        <NoCameraPermission />
      )}
    </View>
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

export default ScanBarcode;
