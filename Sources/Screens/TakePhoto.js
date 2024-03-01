import React, { useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { RNButton, RNHeader, RNStyles } from '../Common';
import { Strings } from '../Constants';
import { hp, wp } from '../Theme';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../Redux/Actions';

const TakePhoto = ({ navigation }) => {
  const [State, setState] = useState({ isLoading: false });
  const cameraRef = useRef();
  const dispatch = useDispatch();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const styles = useStyles();

  const onTakePhoto = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      let photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'speed',
        flash: 'off',
        enableShutterSound: false,
      });
      photo.path =
        Platform.OS == 'android' ? `file://${photo.path}` : photo.path;

      console.log('onTakePhoto -> ', JSON.stringify(photo, null, 2));
      if (photo?.path) {
        dispatch(addPhoto(photo));
        navigation.goBack();
      }
    } catch (e) {
      console.log('Error onTakePhoto -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.TakePhoto} />

      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          device={device}
          isActive={isFocused}
          style={RNStyles.container}
          photo={true}
        />
      </View>

      <RNButton
        disable={State.isLoading}
        isLoading={State.isLoading}
        title={Strings.TakePhoto}
        style={styles.button}
        onPress={onTakePhoto}
      />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    cameraContainer: {
      flex: 1,
      height: '100%',
      width: '90%',
      alignSelf: 'center',
      marginTop: hp(2),
      borderRadius: wp(2),
    },
    button: {
      marginHorizontal: wp(6),
      marginVertical: hp(2),
    },
  });
};

export default TakePhoto;
