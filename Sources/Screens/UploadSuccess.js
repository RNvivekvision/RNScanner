import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNButton, RNStyles, RNText } from '../Common';
import { NavRoutes } from '../Navigation';
import { FontFamily, FontSize, hp, wp } from '../Theme';
import { Strings } from '../Constants';

const UploadSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <RNText style={styles.text}>{Strings.PhotoSuccessfullyUploaded}</RNText>
      <RNButton
        title={Strings.BackToHome}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: NavRoutes.Login }] })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
  },
  text: {
    fontSize: FontSize.font30,
    fontFamily: FontFamily.Medium,
    paddingHorizontal: wp(8),
    textAlign: 'center',
    paddingVertical: hp(10),
  },
});

export default UploadSuccess;
