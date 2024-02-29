import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  RNButton,
  RNKeyboardAvoid,
  RNStyles,
  RNText,
  SCInput,
} from '../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { setUser } from '../Redux/Actions';
import { Images, Strings } from '../Constants';
import { NavRoutes } from '../Navigation';
import { Functions } from '../Utils';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const styles = useStyles();
  const [State, setState] = useState({
    username: '',
    password: '',
    passwordSecure: true,
    submitPressed: false,
  });

  const errorUsername =
    State.submitPressed &&
    (State.username.length === 0 || State.username.length < 4);
  const errorPassword =
    State.submitPressed &&
    (State.password.length === 0 || State.password.length < 4);
  const noErrors = State.username.length > 3 && State.password.length > 3;

  const onLoginPress = async () => {
    setState(p => ({ ...p, submitPressed: true }));
    if (!noErrors) return;
    const user = { username: State.username, password: State.password };
    try {
      await Functions.setAppData({ user });
      dispatch(setUser(user));
      navigation.replace(NavRoutes.BarcodeInput);
    } catch (e) {
      console.log('Error onSubmitPress -> ', e);
    }
  };

  return (
    <View style={RNStyles.container}>
      <RNKeyboardAvoid>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.content}>
            <Image
              source={Images.appLogo}
              resizeMode={'contain'}
              style={styles.logo}
            />
            <Image
              source={Images.loginLogo}
              resizeMode={'contain'}
              style={styles.loginLogo}
            />

            <RNText style={styles.title}>{Strings.Login}</RNText>

            <SCInput
              title={Strings.Email}
              placeholder={Strings.Enteryouremail}
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
              onSubmitEditing={onLoginPress}
              error={errorPassword}
              icon={State.passwordSecure ? Images.Show : Images.Hide}
              onIconPress={() =>
                setState(p => ({ ...p, passwordSecure: !p.passwordSecure }))
              }
            />

            <View style={styles.RememberMeContainer}>
              <TouchableOpacity activeOpacity={0.6}>
                <View style={RNStyles.flexRow}>
                  <View style={styles.Box} />
                  <RNText size={FontSize.font12} color={Colors.N475569}>
                    {'Remember me'}
                  </RNText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6}>
                <RNText size={FontSize.font12} color={Colors.N054579}>
                  {'Forgot Password ?'}
                </RNText>
              </TouchableOpacity>
            </View>

            <RNButton
              title={Strings.Login}
              style={styles.login}
              onPress={onLoginPress}
            />

            <RNText
              align={'center'}
              pTop={hp(2)}
              size={FontSize.font12}
              color={Colors.N64748B}>
              {'Or continue with'}
            </RNText>

            <View style={RNStyles.flexRow}>
              <RNButton
                icon={Images.Google}
                title={Strings.Google}
                style={styles.loginWith}
                textStyle={styles.loginwithText}
                onPress={onLoginPress}
              />
              <RNButton
                icon={Images.Facebook}
                title={Strings.Facebook}
                style={styles.loginWith}
                textStyle={styles.loginwithText}
                onPress={onLoginPress}
              />
            </View>

            <View style={styles.DontHaveAccount}>
              <RNText size={FontSize.font12} color={Colors.N475569}>
                {'Don’t have account? '}
              </RNText>

              <TouchableOpacity activeOpacity={0.6}>
                <RNText
                  family={FontFamily.Medium}
                  size={FontSize.font12}
                  color={Colors.N054579}>
                  {'Create now'}
                </RNText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </RNKeyboardAvoid>
    </View>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    content: {
      ...RNStyles.container,
      paddingHorizontal: wp(6),
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
    },
    logo: {
      width: wp(25),
      height: hp(5),
      marginTop: hp(3),
    },
    loginLogo: {
      width: wp(53),
      height: hp(25),
      marginVertical: hp(2),
    },
    title: {
      fontSize: FontSize.font32,
      fontFamily: FontFamily.SemiBold,
    },
    RememberMeContainer: {
      ...RNStyles.flexRowBetween,
      paddingVertical: hp(1.5),
      paddingBottom: hp(3),
    },
    Box: {
      width: wp(4),
      height: wp(4),
      borderWidth: 1,
      marginRight: wp(2),
      borderRadius: wp(1),
    },
    login: {
      width: wp(85),
      marginHorizontal: 0,
    },
    loginWith: {
      flex: 1,
      marginHorizontal: wp(1),
      backgroundColor: Colors.F1F5F9,
    },
    loginwithText: {
      color: Colors.Black,
      fontSize: FontSize.font14,
      fontFamily: FontFamily.Regular,
    },
    DontHaveAccount: {
      ...RNStyles.flexRow,
      alignSelf: 'center',
      paddingVertical: hp(1),
      color: Colors.N828282,
    },
  });
};

export default Login;
