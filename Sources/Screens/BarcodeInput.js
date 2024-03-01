import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RNButton, RNInput, RNStyles, RNText } from '../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { RNHeader } from '../Common';
import { NavRoutes } from '../Navigation';
import { Scanner } from '../Components';
import { Images, Strings } from '../Constants';
import { usePermissions } from '../Hooks';
import { useIsFocused } from '@react-navigation/native';

const BarcodeInput = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { requestPermissions } = usePermissions();
  const [State, setState] = useState({
    barcode: '',
    showScanner: false,
    submitPressed: false,
  });

  const ResetState = () => {
    setState(p => ({
      barcode: '',
      showScanner: false,
      submitPressed: false,
    }));
  };

  useEffect(() => {
    if (isFocused) {
      ResetState();
    }
  }, [isFocused]);

  const errorBarcode =
    State.submitPressed &&
    (State.barcode.length === 0 || State.barcode.length < 4);
  const noErrors = State.barcode.length > 3;
  const styles = useStyles({ error: errorBarcode });

  const onSubmitPress = () => {
    setState(p => ({ ...p, submitPressed: true }));
    if (noErrors) {
      navigation.navigate(NavRoutes.PhotoUpload, { code: State.barcode });
    }
  };

  const onScanBarcodePress = async () => {
    await requestPermissions();
    // setState(p => ({ ...p, showScanner: true }));
    navigation.navigate(NavRoutes.ScanBarcode);
  };

  // const closeScanner = () => {
  //   setState(p => ({ ...p, showScanner: false }));
  // };

  const onCodeFound = code => {
    // closeScanner();
    navigation.navigate(NavRoutes.PhotoUpload, { code });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={RNStyles.container}>
        <ScrollView>
          <RNHeader title={Strings.BarcodeScanner} LeftIcon={null} />

          <Image
            source={Images.barcodeLogo}
            resizeMode={'contain'}
            style={styles.barcodeLogo}
          />

          <RNText pLeft={wp(4)} family={FontFamily.Medium}>
            {Strings.EnterBarcodeCode}
          </RNText>
          <RNInput
            placeholder={Strings.EnterBarcodeCodeHere}
            placeholderTextColor={errorBarcode ? Colors.d13232 : Colors.Black}
            style={styles.input}
            value={State.barcode}
            onChangeText={v => setState(p => ({ ...p, barcode: v }))}
          />

          <RNButton
            title={Strings.SubmitCode}
            style={styles.button}
            onPress={onSubmitPress}
          />
          <RNText style={styles.OR}>{Strings.Or}</RNText>
          <RNButton
            title={Strings.ScanBarCode}
            style={styles.button}
            onPress={onScanBarcodePress}
          />

          {/* <Scanner
          visible={State.showScanner}
          onClose={closeScanner}
          onCodeFound={onCodeFound}
        /> */}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const useStyles = ({ error = true }) => {
  return StyleSheet.create({
    barcodeLogo: {
      width: '80%',
      height: hp(30),
      marginVertical: hp(4),
      alignSelf: 'center',
    },
    OR: {
      alignSelf: 'center',
      paddingVertical: hp(2),
      fontSize: FontSize.font12,
    },
    input: {
      backgroundColor: Colors.EEF7FF,
      marginHorizontal: wp(4),
      borderRadius: wp(2),
      fontSize: FontSize.font12,
      fontFamily: error ? FontFamily.Medium : FontFamily.ExtraLight,
      color: Colors.Black,
    },
    button: {
      marginHorizontal: wp(6),
    },
  });
};

export default BarcodeInput;
