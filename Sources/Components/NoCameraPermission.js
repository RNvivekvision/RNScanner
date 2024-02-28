import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNText, RNStyles, RNButton } from '../Common';
import { Colors, FontFamily, FontSize, hp } from '../Theme';
import { usePermissions } from '../Hooks';
import { Strings } from '../Constants';

const NoCameraPermission = () => {
  const { requestPermissions, checkPermissions } = usePermissions();

  const onRequestPermissions = async () => {
    try {
      await requestPermissions();
      await checkPermissions();
    } catch (e) {
      console.log('Error NoCameraPermission Requesting Permissions -> ', e);
    }
  };

  return (
    <View style={styles.container}>
      <RNText style={styles.text}>{Strings.NoCameraPermission}</RNText>

      <RNButton
        title={Strings.RequestPermission}
        style={styles.button}
        onPress={onRequestPermissions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
    backgroundColor: Colors.Black,
  },
  text: {
    paddingHorizontal: 20,
    fontSize: FontSize.font24,
    fontFamily: FontFamily.SemiBold,
    textAlign: 'center',
    color: Colors.White,
  },
  button: {
    width: '70%',
    marginTop: hp(5),
  },
});

export default NoCameraPermission;
