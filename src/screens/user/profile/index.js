import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Text,
  CheckBox,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AssetsImages from '../../../assets';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/AntDesign';

import HeaderButton from '../../../components/UI/HeaderButton';
import {Avatar} from 'react-native-elements';
import Input from '../../../components/UI/Input';
import Card from '../../../components/UI/Card';
import Colors from '../../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const Profile = (props) => {
  const [error, setError] = useState();

  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      isEditable: false,
    },

    formIsValid: false,
  });

  const authHandler = async () => {
    if (formState.inputValues.Otp.length < 6) {
      setError(null);
      setIsLoading(true);
    } else {
      try {
        props.navigation.navigate('Shop');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={10} style={styles.screen}>
      <View style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.logo}>
              <View>
                <Avatar
                  rounded
                  size="xlarge"
                  resizeMode="contain"
                  source={AssetsImages.Group}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={{marginTop: 10, fontSize: 20}}>Basic Info</Text>
            <View>
              <Input
                id="Full_Name"
                label="Full Name"
                required
                placeholder="Kapil Vidua"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="Email"
                label="Email"
                required
                placeholder="KapilVidua001@gmail.com"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="Phone"
                label="Phone"
                keyboardType="number-pad"
                required
                placeholder="9111606923"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="Address"
                label="Address"
                required
                placeholder="A-83 new awas vikas colony jhansi"
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '100%',
    padding: 20,
    marginTop: 10,
  },

  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: Colors.light_gray,
    fontSize: 13,
  },
  headerStyle: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
  },
  containerSideMenu: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
});
export default Profile;
