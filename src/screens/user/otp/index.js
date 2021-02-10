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
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch} from 'react-redux';

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

const otp = (props) => {
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      Otp: '',
    },
    inputValidities: {
      Otp: false,
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
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.green_color,
              }}>
              Please enter OTP
            </Text>
            <Text style={{fontWeight: 'bold', marginTop: 10}}>
              We've send you a SMS with 6-digit verification coder
            </Text>
            <Input
              id="Otp"
              label="OTP"
              keyboardType="number-pad"
              required
              minLength={6}
              maxNumber={6}
              maxLength={6}
              autoCapitalize="none"
              errorText="Please enter a otp password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={authHandler}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: Colors.green_color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name="ios-arrow-forward" size={25} color="white" />
              </TouchableOpacity>
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
    maxHeight: 400,
    padding: 20,
    marginTop: 40,
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
});

export default otp;
