import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AssetsImages from '../../../assets';
import Colors from '../../../constants/Colors';
import CartItem from '../../../components/shop/CartItem';
import Card from '../../../components/UI/Card';
import * as cartActions from '../../../store/actions/cart';
import * as ordersActions from '../../../store/actions/orders';
import BtnWithImage from '../../../components/shop/BtnWithImage';

import ImageCarousel, {Pagination} from 'react-native-snap-carousel';

const cartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('cartItems', cartItems);
    props.navigation.setOptions({
      headerTitle: 'Favorite',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontSize: 18,
        fontFamily: 'Avenir',
        alignSelf: 'center',
      },
      headerLeft: () => (
        <BtnWithImage
          img={AssetsImages.Group}
          btnImgStyle={{height: '100%', width: '80%'}}
          onPress={() => {
            props.navigation.goBack();
          }}
          btnStyle={{marginLeft: 8}}
        />
      ),
      headerRight: () => (
        <BtnWithImage
          img={AssetsImages.Groupbal}
          btnImgStyle={{height: '100%', width: '50%'}}
          onPress={() => {
            // this.props.navigation.navigate("Schedule");
          }}
          btnStyle={{marginRight: 8}}
        />
      ),
    });

    // console.log("prevProps => " + JSON.stringify(this.props.route.params))

    // this.setState({ isFrom: this.props.route.params.isFrom }, () => {
    //   this.initialSetup();
    // });
  });
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={{margin: 10}}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => (
              <CartItem
                quantity={itemData.item.quantity}
                image={itemData.item.imageUrl}
                title={itemData.item.productId}
                // amount={itemData.item.sum}
                deletable
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(itemData.item.productId));
                }}
              />
            )}
          />

          <Card style={styles.summary}>
            <Text style={styles.summaryText}>
              Total: <Text style={styles.amount}>${cartTotalAmount}</Text>
            </Text>
            <Button
              color={Colors.accent}
              title="Order Now"
              disabled={cartItems.length === 0}
              onPress={() => {
                dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
              }}
            />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1},
  summary: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: 18,
    margin: 10,
    color: '#999999',
  },
  amount: {
    color: 'black',
    margin: 10,
    fontSize: 18,
  },
});

export default cartScreen;
