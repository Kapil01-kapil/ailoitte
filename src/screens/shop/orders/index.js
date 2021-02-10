import React, {useState, useEffect} from 'react';
import {FlatList, Text, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import AssetsImages from '../../../assets';
import HeaderButton from '../../../components/UI/HeaderButton';
import OrderItem from '../../../components/shop/OrderItem';
import BtnWithImage from '../../../components/shop/BtnWithImage';
import ImageCarousel, {Pagination} from 'react-native-snap-carousel';
import Seach from '../../../components/shop/Seach';
import {CONST} from '../../../utils/constants';
const ordersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    console.log('orders', orders);
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
            props.navigation.navigate('Profile');
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
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default ordersScreen;
