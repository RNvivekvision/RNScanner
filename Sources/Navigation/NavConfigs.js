import { TransitionPresets } from '@react-navigation/stack';
import { FontFamily } from '../Theme';
const screenOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: FontFamily.SemiBold,
  },
  ...TransitionPresets.SlideFromRightIOS,
};
const NavConfigs = {
  screenOptions,
};
export default NavConfigs;
