import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartItem = (props) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.cartItem}>
        <View style={styles.itemData}>
          <Image style={styles.image} source={{uri: props.image}} />
          <View>
            <Text style={styles.mainText}>{props.title}</Text>
            <Text style={styles.mainText}>{props.amount}</Text>
            <Text style={styles.quantity}>{props.quantity} </Text>
          </View>
        </View>
        <View style={styles.itemData}>
          {props.deletable && (
            <TouchableOpacity
              onPress={props.onRemove}
              style={styles.deleteButton}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                size={23}
                color="red"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  image: {
    height: 100,
    width: 100,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
