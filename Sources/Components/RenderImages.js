import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { RNStyles } from '../Common';
import { hp, wp } from '../Theme';

const RenderImages = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item?.path }}
        resizeMode={'cover'}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(30),
    height: wp(30),
    marginHorizontal: wp(1),
    marginVertical: hp(1),
  },
  image: {
    ...RNStyles.image100,
  },
});

export default RenderImages;
