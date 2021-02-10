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
const dashboard = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const [dataSource, setdataSource] = useState([
    {
      url: AssetsImages.Banner,
      img_width: '65%',
    },
    {
      url: AssetsImages.Banner,
      img_width: '65%',
    },
    {
      url: AssetsImages.Banner,
      img_width: '65%',
    },
  ]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isProducts, setProducts] = useState([
    {
      title: 'Vegetable',
      imageProduct: AssetsImages.Vegetables,
    },
    {
      title: 'Fruit',
      imageProduct: AssetsImages.Fruits,
    },
    {
      title: 'Cleaning',
      imageProduct: AssetsImages.Cleaning,
    },
    {
      title: 'Grocery',
      imageProduct: AssetsImages.Grocery,
    },
  ]);
  const [isProduct, setProduct] = useState([
    {
      title: 'Meat',
      imageProduct: AssetsImages.Meat,
    },
    {
      title: 'Spice',
      imageProduct: AssetsImages.Spice,
    },
    {
      title: 'Fish',
      imageProduct: AssetsImages.Fish,
    },
    {
      title: 'Edible Oil',
      imageProduct: AssetsImages.EdibleOil,
    },
  ]);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    props.navigation.setOptions({
      headerTitle: 'Welcome to 86',
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
    const handleBackButton = () => {
      // alert(JSON.stringify(this.props.navigation.isFocused()))//this.props.route.name
      if (props.navigation.isFocused()) {
        Alert.alert(
          'Exit App',
          'Exiting the application?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {
            cancelable: false,
          },
        );
        return true;
      }
    };

    // console.log("prevProps => " + JSON.stringify(this.props.route.params))

    // this.setState({ isFrom: this.props.route.params.isFrom }, () => {
    //   this.initialSetup();
    // });
  });
  return (
    <ScrollView style={{flex: 1, height: '100%', backgroundColor: 'white'}}>
      <View>
        <Text style={{margin: 10, color: '#999'}}>Find your daily goods</Text>
        <View style={{flexDirection: 'row'}}>
          <Seach placeholder={'Search here...'} />
          <Image
            source={AssetsImages.filter}
            resizeMode="contain"
            style={{marginTop: 10}}
          />
        </View>

        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,

              fontWeight: 'bold',
            }}>
            Promotions
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              props.navigation.navigate('Baking');
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                marginRight: 5,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 10}}>
          <ImageCarousel
            data={dataSource}
            renderItem={(item) => (
              <View>
                <Image
                  style={{
                    width: item.img_width,
                    resizeMode: 'stretch',
                    height: 200,
                  }}
                  source={AssetsImages.Banner}
                />
              </View>
            )}
            sliderWidth={CONST.DEVICE_WIDTH}
            sliderHeight={CONST.DEVICE_HEIGHT / 1.6}
            itemHeight={CONST.DEVICE_HEIGHT / 1.6}
            layout={'default'}
            itemWidth={CONST.DEVICE_WIDTH}
            autoplay={true}
            autoplayInterval={3000}
            autoplayDelay={1000}
            loop={true}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <View>
            <Pagination
              data={dataSource}
              dotsLength={dataSource.length}
              activeDotIndex={activeSlide}
              dotColor={'#999'}
              dotStyle={{
                height: 10,
                width: 10,
                borderRadius: 5,
              }}
              inactiveDotColor={'#D9DAE3'}
              inactiveDotOpacity={0.6}
              inactiveDotScale={1}
            />
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={isProduct}
            horizontal={true}
            keyExtractor={(item) => item.title}
            renderItem={(itemData) => (
              <View
                style={{
                  marginLeft: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={itemData.item.imageProduct}
                  //  style={{width: '20%', width: '20%'}}
                />
                <Text style={{fontSize: 12}}>{itemData.item.title}</Text>
              </View>
            )}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={isProducts}
            horizontal={true}
            keyExtractor={(item) => item.title}
            renderItem={(itemData) => (
              <View
                style={{
                  marginLeft: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={itemData.item.imageProduct}
                  //  style={{width: '20%', width: '20%'}}
                />
                <Text style={{fontSize: 12}}>{itemData.item.title}</Text>
              </View>
            )}
          />
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            marginLeft: 15,
            marginTop: 10,
            fontWeight: 'bold',
          }}>
          Today's Best Deals
        </Text>
        <View style={{marginBottom: 150}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={products}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
              <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.green_color,
                    width: '100%',
                    height: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                  onPress={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                  }}>
                  <Text style={{color: 'white'}}>Add to Card</Text>
                </TouchableOpacity>
              </ProductItem>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default dashboard;
