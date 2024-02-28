import React, { forwardRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import RNInput from './RNInput';
import RNStyles from './RNStyles';
import RNText from './RNText';

const SCInput = forwardRef(
  ({ title, icon, onIconPress, error, ...rest }, ref) => {
    const styles = useStyles({ error });

    return (
      <View style={styles.container}>
        {title && <RNText style={styles.title}>{title}</RNText>}
        <View style={styles.inputContainer}>
          <RNInput
            ref={ref}
            placeholderTextColor={error && '#d13232'}
            style={styles.input}
            {...rest}
          />

          {icon && (
            <TouchableOpacity
              style={styles.IconContainer}
              activeOpacity={0.6}
              onPress={onIconPress}>
              <Image source={icon} resizeMode={'contain'} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

const useStyles = ({ error }) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: wp(4),
      paddingTop: hp(1),
    },
    title: {
      fontFamily: FontFamily.Medium,
      color: error ? Colors.d13232 : Colors.Black,
    },
    inputContainer: {
      ...RNStyles.flexRow,
      width: wp(85),
      borderWidth: 1,
      borderColor: error ? Colors.d13232 : Colors.Placeholder,
      borderRadius: wp(2),
      marginVertical: hp(1),
    },
    input: {
      fontSize: FontSize.font14,
      flex: 1,
      marginVertical: 0,
      paddingRight: 0,
    },
    IconContainer: {
      ...RNStyles.center,
      width: wp(8),
      height: wp(8),
      marginHorizontal: wp(1),
    },
    icon: {
      ...RNStyles.image70,
      tintColor: error ? Colors.d13232 : Colors.Placeholder,
    },
  });
};

export default SCInput;
