import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  RNButton,
  RNFloating,
  RNHeader,
  RNInput,
  RNStyles,
  RNText,
} from '../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { NavRoutes } from '../Navigation';
import { RenderImages } from '../Components';
import { Images, Strings } from '../Constants';

const PhotoUpload = ({ navigation, route }) => {
  const code = route?.params?.code;
  // console.log('PhotoUpload code -> ', code);
  const [State, setState] = useState({ Images: [] });
  const styles = useStyles({});

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

  const ListHeaderComponent = ({}) => {
    return (
      <>
        <RNInput
          placeholder={Strings.EnterBarcodeCodeHere}
          style={styles.input}
          value={Strings.Username}
          editable={false}
        />
        <RNInput
          placeholder={Strings.EnterBarcodeCodeHere}
          style={styles.input}
          value={code || Strings.BarcodeID}
          editable={false}
        />
        <RNText style={styles.heading}>{Strings.UploadPhoto}</RNText>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={openGallery}
          style={styles.uploadPhoto}>
          <Image
            source={Images.Upload}
            resizeMode={'contain'}
            style={styles.uploadIcon}
          />
        </TouchableOpacity>
        {State.Images?.length > 0 && (
          <RNText style={styles.heading}>{Strings.PreviewUploadImages}</RNText>
        )}
      </>
    );
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.UploadPhoto} />

      <FlatList
        data={State.Images}
        keyExtractor={(v, i) => String(i)}
        numColumns={3}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={() => <ListHeaderComponent />}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <RenderImages item={item} />}
      />

      <RNButton
        title={Strings.UploadPhoto}
        style={styles.uploadPhotoButton}
        onPress={onUploadPhotoPress}
      />
      <RNFloating icon={Images.Camera} onPress={openCamera} />
    </View>
  );
};

const useStyles = ({}) => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    contentContainerStyle: {
      paddingBottom: inset.bottom + hp(1),
      paddingTop: hp(2),
      paddingHorizontal: wp(4),
    },
    input: {
      backgroundColor: Colors.EEF7FF,
      borderRadius: wp(2),
      fontSize: FontSize.font12,
      fontFamily: FontFamily.Medium,
      color: Colors.Black,
    },
    heading: {
      fontSize: FontSize.font12,
      fontFamily: FontFamily.Medium,
      paddingVertical: hp(2),
    },
    uploadPhoto: {
      ...RNStyles.center,
      borderWidth: wp(0.3),
      borderColor: Colors.Black,
      borderStyle: 'dashed',
      borderRadius: wp(3),
      height: hp(10),
      backgroundColor: Colors.EEF7FF,
    },
    uploadIcon: {
      width: wp(7),
      height: wp(7),
    },
    uploadPhotoButton: {
      position: 'absolute',
      bottom: inset.bottom + hp(1),
      left: 0,
      right: 0,
      marginHorizontal: wp(6),
    },
  });
};

export default PhotoUpload;
