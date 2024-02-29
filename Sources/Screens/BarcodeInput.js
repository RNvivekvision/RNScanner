import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNButton, RNInput, RNStyles, RNText, SCInput } from '../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { NavRoutes } from '../Navigation';
import { Scanner } from '../Components';
import { Strings } from '../Constants';
import { useSelector } from 'react-redux';

const BarcodeInput = ({ navigation }) => {
  const { user } = useSelector(({ UserReducer }) => UserReducer);
  console.log({ user });
  const [State, setState] = useState({
    barcode: '',
    showScanner: false,
    submitPressed: false,
  });
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

  const onScanBarcodePress = () => {
    setState(p => ({ ...p, showScanner: true }));
  };

  const closeScanner = () => {
    setState(p => ({ ...p, showScanner: false }));
  };

  const onCodeFound = code => {
    closeScanner();
    navigation.navigate(NavRoutes.PhotoUpload, { code });
  };

  return (
    <View style={styles.container}>
      <Scanner
        visible={State.showScanner}
        onClose={closeScanner}
        onCodeFound={onCodeFound}
      />

      <View>
        <RNInput
          placeholder={Strings.EnterBarCode}
          placeholderTextColor={errorBarcode && Colors.d13232}
          style={styles.input}
          value={State.barcode}
          onChangeText={v => setState(p => ({ ...p, barcode: v }))}
        />

        <RNButton
          title={Strings.Submit}
          style={styles.submit}
          onPress={onSubmitPress}
        />
      </View>

      <RNText style={styles.OR}>{Strings.OR}</RNText>

      <RNButton title={Strings.ScanBarCode} onPress={onScanBarcodePress} />
    </View>
  );
};

const useStyles = ({ error = true }) => {
  return StyleSheet.create({
    container: {
      ...RNStyles.container,
      paddingTop: hp(3),
    },
    OR: {
      alignSelf: 'center',
      paddingVertical: hp(8),
      fontFamily: FontFamily.SemiBold,
    },
    input: {
      borderWidth: 1,
      borderColor: error ? Colors.d13232 : Colors.Placeholder,
      marginHorizontal: wp(6),
      borderRadius: wp(2),
      fontSize: FontSize.font14,
    },
    submit: {
      alignSelf: 'flex-end',
      width: '33%',
      marginRight: wp(6),
    },
  });
};

export default BarcodeInput;
