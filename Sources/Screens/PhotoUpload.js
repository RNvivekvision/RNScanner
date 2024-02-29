import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageCropPicker from 'react-native-image-crop-picker';
import { RNButton, RNStyles, RNText } from '../Common';
import { Colors, hp, wp } from '../Theme';
import { NavRoutes } from '../Navigation';
import { RenderImages } from '../Components';
import { Strings } from '../Constants';
import { Functions } from '../Utils';

const PhotoUpload = ({ navigation, route }) => {
  const code = route?.params?.code;
  console.log({ code });
  const [State, setState] = useState({ Images: [] });
  const styles = useStyles();

  const methods = {
    0: () => {},
    1: () => openCamera(),
    2: () => openGallery(),
  };

  const openGallery = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
      });
      // console.log('Image -> ', JSON.stringify(image, null, 2));
      setState(p => ({ ...p, Images: [...p.Images, image] }));
    } catch (e) {
      console.log('Error onUploadPress -> ', e);
    }
  };

  const openCamera = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        width: 300,
        height: 400,
      });
      // console.log('Image -> ', JSON.stringify(image, null, 2));
      setState(p => ({ ...p, Images: [...p.Images, image] }));
    } catch (e) {
      console.log('Error onUploadPress -> ', e);
    }
  };

  const onUploadPhotoPress = async () => {
    if (State.Images.length === 0) {
      return alert('Please select image.');
    }

    try {
      navigation.navigate(NavRoutes.UploadSuccess);
    } catch (e) {
      console.log('Error onUploadPhotoPress -> ', e);
    }
  };

  return (
    <View style={RNStyles.container}>
      <View style={styles.usernameConatiner}>
        <View style={{ flex: 1 }}>
          <RNText>{Strings.Username}</RNText>
          <RNText numOfLines={2}>{'John Doe'}</RNText>
        </View>

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <RNText>{Strings.BarcodeID}</RNText>
          <RNText numOfLines={2}>{'5010415333162'}</RNText>
        </View>
      </View>

      <RNButton
        title={Strings.UploadPhoto}
        style={{ marginVertical: hp(5) }}
        onPress={onUploadPhotoPress}
      />

      <View style={styles.photoContainer}>
        <RNButton
          title={Strings.Upload}
          style={styles.upload}
          onPress={() =>
            Functions.Options({ onPress: index => methods[index]() })
          }
        />
        <FlatList
          data={State.Images}
          keyExtractor={(v, i) => String(i)}
          numColumns={3}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item }) => <RenderImages item={item} />}
        />
      </View>
    </View>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    usernameConatiner: {
      // ...RNStyles.flexRowBetween,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
    },
    photoContainer: {
      flex: 1,
      borderTopWidth: 1,
      borderTopColor: Colors.Placeholder,
    },
    upload: {
      position: 'absolute',
      bottom: inset.bottom + hp(2),
      right: 0,
      zIndex: 1,
      width: '30%',
    },
    contentContainerStyle: {
      paddingBottom: inset.bottom + hp(2),
      paddingVertical: hp(0.5),
      paddingHorizontal: wp(2),
    },
  });
};

export default PhotoUpload;
