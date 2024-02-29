import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import RNStyles from './RNStyles';
import RNText from './RNText';
import { Images } from '../Constants';

const RNButton = ({
  title,
  style,
  textStyle,
  onPress,
  disable,
  icon,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disable}
      style={[styles.Container, style]}>
      {icon && (
        <Image
          source={icon}
          resizeMode={'contain'}
          style={[styles.icon, iconStyle]}
        />
      )}
      <RNText style={[styles.buttonText, textStyle]}>{title}</RNText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    ...RNStyles.center,
    ...RNStyles.flexRow,
    backgroundColor: Colors.Primary,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    borderRadius: wp(3),
  },
  buttonText: {
    fontSize: FontSize.font18,
    fontFamily: FontFamily.SemiBold,
    color: Colors.White,
  },
  icon: {
    ...RNStyles.icon,
    marginRight: wp(2),
  },
});

export default RNButton;
