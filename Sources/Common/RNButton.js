import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import RNPagginationLoader from './RNPagginationLoader';
import RNStyles from './RNStyles';
import RNText from './RNText';

const RNButton = ({
  title,
  style,
  textStyle,
  onPress,
  disable,
  icon,
  iconStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disable}
      style={[styles.Container, style]}>
      {isLoading ? (
        <RNPagginationLoader size={'small'} color={Colors.White} />
      ) : (
        <>
          {icon && (
            <Image
              source={icon}
              resizeMode={'contain'}
              style={[styles.icon, iconStyle]}
            />
          )}
          <RNText style={[styles.buttonText, textStyle]}>{title}</RNText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    ...RNStyles.center,
    ...RNStyles.flexRow,
    backgroundColor: Colors.Primary,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    borderRadius: wp(3),
  },
  buttonText: {
    fontSize: FontSize.font14,
    fontFamily: FontFamily.SemiBold,
    color: Colors.White,
  },
  icon: {
    ...RNStyles.icon,
    marginRight: wp(2),
  },
});

export default RNButton;
