import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, hp, wp } from '../Theme';
import RNStyles from './RNStyles';

const size = wp(15);

const RNFloating = ({ icon, onPress, containerStyle, iconStyle }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {icon && (
        <Image
          source={icon}
          resizeMode={'contain'}
          style={[styles.icon, iconStyle]}
        />
      )}
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      ...RNStyles.center,
      ...RNStyles.shadow,
      width: size,
      height: size,
      position: 'absolute',
      zIndex: 11111111,
      bottom: inset.bottom + hp(10),
      right: wp(6),
      backgroundColor: Colors.Primary,
      borderRadius: 100,
    },
    icon: {
      width: wp(8),
      height: wp(8),
    },
  });
};

export default RNFloating;
