import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RNButton, RNStyles, RNText, SCInput } from '../Common';
import { FontFamily, FontSize, hp, wp } from '../Theme';
import { NavRoutes } from '../Navigation';
import { Images, Strings } from '../Constants';

const Login = ({ navigation }) => {
  const [State, setState] = useState({
    username: '',
    password: '',
    passwordSecure: true,
    submitPressed: false,
  });
  const passwordRef = useRef();

  const errorUsername =
    State.submitPressed &&
    (State.username.length === 0 || State.username.length < 4);
  const errorPassword =
    State.submitPressed &&
    (State.password.length === 0 || State.password.length < 4);
  const noErrors = State.username.length > 3 && State.password.length > 3;

  const onSubmitPress = async () => {
    setState(p => ({ ...p, submitPressed: true }));
    if (!noErrors) return;

    try {
      navigation.navigate(NavRoutes.BarcodeInput);
    } catch (e) {
      console.log('Error onSubmitPress -> ', e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <RNText style={styles.title}>{Strings.Login}</RNText>

        <SCInput
          title={Strings.Username}
          placeholder={Strings.Enteryourusername}
          value={State.username}
          onChangeText={v => setState(p => ({ ...p, username: v }))}
          onSubmitEditing={() => passwordRef.current.focus()}
          error={errorUsername}
        />

        <SCInput
          ref={passwordRef}
          title={Strings.Password}
          placeholder={Strings.EnteryourPassword}
          value={State.password}
          secureTextEntry={State.passwordSecure}
          returnKeyType={'done'}
          onChangeText={v => setState(p => ({ ...p, password: v }))}
          onSubmitEditing={onSubmitPress}
          error={errorPassword}
          icon={State.passwordSecure ? Images.Show : Images.Hide}
          onIconPress={() =>
            setState(p => ({ ...p, passwordSecure: !p.passwordSecure }))
          }
        />

        <RNButton
          title={Strings.Submit}
          style={styles.submit}
          onPress={onSubmitPress}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
    paddingBottom: hp(10),
  },
  title: {
    fontSize: FontSize.font35,
    fontFamily: FontFamily.SemiBold,
    paddingBottom: hp(8),
  },
  submit: {
    marginTop: hp(5),
    width: wp(85),
  },
});

export default Login;
