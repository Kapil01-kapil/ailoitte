import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import Colors from '../../constants/Colors';
import AssetsImages from '../../assets';

const Seach = (props) => {
  return (
    <View style={styles.formControl}>
      <Image
        source={AssetsImages.search}
        style={{
          height: '60%',
          width: '20%',
          resizeMode: 'center',
          marginTop: 10,
        }}
      />
      <TextInput
        {...props}
        style={styles.input}
        value={props.value}
        onChangeText={props.textChangeHandler}
        onBlur={props.lostFocusHandler}
        placeholder={props.placeholder}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  formControl: {
    width: '75%',
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: '#f6f7f7',
  },
  label: {
    // fontFamily: 'open-sans-bold',
    // marginVertical: 8,
    color: Colors.light_gray,
  },
  input: {
    color: Colors.light_gray,
    // paddingHorizontal: 2,
    // paddingVertical: 5,
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});
export default Seach;
