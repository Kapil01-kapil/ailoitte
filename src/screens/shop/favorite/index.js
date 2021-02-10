import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Platform,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Button,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Offer from '../../../components/shop/Offer';
import HeaderButton from '../../../components/UI/HeaderButton';
import ProductItem from '../../../components/shop/ProductItem';
import * as cartActions from '../../../store/actions/cart';
import Colors from '../../../constants/Colors';
import AssetsImages from '../../../assets';
import BtnWithImage from '../../../components/shop/BtnWithImage';
import ImageCarousel, {Pagination} from 'react-native-snap-carousel';
import Seach from '../../../components/shop/Seach';
import {CONST} from '../../../utils/constants';
import Wishlist from '../../../components/shop/Wishlist';

const favorite = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  useEffect(() => {
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
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <Wishlist
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}>
          <Text
            style={{
              borderWidth: 1,
              padding: 5,
              width: 100,
              textAlign: 'center',
              fontWeight: 'bold',
              borderColor: Colors.green_color,
              color: 'white',
              backgroundColor: Colors.green_color,
            }}>
            Add to card
          </Text>
        </Wishlist>
      )}
    />
  );
};

export default favorite;
