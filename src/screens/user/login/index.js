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
import helper from '../../../utils/helper';
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

const login = (props) => {
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  //const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      mobile: '',
    },
    inputValidities: {
      mobile: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (mobileRegex.test(formState.inputValues.mobile) == '') {
      setError(null);
      setIsLoading(true);
    } else {
      try {
        props.navigation.navigate('Otp');
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
        <View
          style={{
            width: '90%',
            maxWidth: 400,
            maxHeight: 400,

            marginTop: 20,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            Welcome to ailoitte
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: Colors.light_gray,
              fontWeight: 'bold',
            }}>
            Let's get Started
          </Text>
        </View>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.green_color,
              }}>
              Login
            </Text>
            <Text style={{fontWeight: 'bold', marginTop: 10}}>
              please enter your phone number
            </Text>
            <Input
              id="mobile"
              label="Phone Number"
              keyboardType="number-pad"
              required
              mobile
              maxNumber={10}
              autoCapitalize="none"
              errorText="Please enter a valid mobile number."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />
              <Text style={styles.label}>
                I agree to Grocery's Terms of Services and Privacy Policy.
              </Text>
            </View>

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
        <Text style={{marginTop: 20, fontSize: 15}}>OR</Text>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View
            style={{
              width: '20%',
              height: 1,
              backgroundColor: Colors.light_gray,
              justifyContent: 'center',
              margin: 10,
            }}
          />
          <Text style={{fontSize: 15}}>Login with social Account</Text>
          <View
            style={{
              width: '20%',
              height: 1,
              backgroundColor: Colors.light_gray,
              margin: 10,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Image
            style={{height: 50, width: 50, margin: 8}}
            source={require('../../../assets/icons/facebook.png')}
          />
          <Image
            style={{height: 50, width: 50, margin: 8}}
            source={require('../../../assets/icons/google.png')}
          />
        </View>
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
    marginTop: 20,
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
    color: Colors.green_color,
  },
  label: {
    margin: 8,
    color: Colors.light_gray,
    fontSize: 13,
  },
});

export default login;
