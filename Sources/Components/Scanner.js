import React, { useEffect } from 'react';
import { View } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import NoCameraPermission from './NoCameraPermission';
import { RNModal, RNStyles } from '../Common';
import { usePermissions } from '../Hooks';

const Scanner = ({ visible, onClose, onCodeFound }) => {
  const { permissions, checkPermissions, requestPermissions } =
    usePermissions();

  useEffect(() => {
    if (visible) {
      checkPermissions();
      requestPermissions();
    }
  }, [visible]);

  const onFoundCode = ({ nativeEvent }) => {
    const code = nativeEvent.codeStringValue;
    onCodeFound?.(code);
  };

  return (
    <RNModal visible={visible} onClose={onClose}>
      {permissions.camera === null && <View style={RNStyles.container} />}
      {permissions.camera ? (
        <CameraScreen scanBarcode={true} onReadCode={onFoundCode} />
      ) : (
        <NoCameraPermission />
      )}
    </RNModal>
  );
};

export default Scanner;
