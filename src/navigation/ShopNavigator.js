import React from 'react';
import {Platform} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ProductsOverviewScreen from '../screens/shop/dashboard';

import CartScreen from '../screens/shop/cart';

import OrdersScreen from '../screens/shop/orders';

import ProfileScreen from '../screens/user/profile';

import WishlistScreen from '../screens/shop/favorite';

import AuthScreen from '../screens/user/login';

import Colors from '../constants/Colors';
import Otp from '../screens/user/otp';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//Define a global color for toolbar
global.backgroundColor = '#176abf';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.green_color : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green_color,
};

const ProductsNavigatorStack = createStackNavigator();
function ProductsNavigatorStackFunc() {
  return (
    <ProductsNavigatorStack.Navigator>
      <ProductsNavigatorStack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
      />
    </ProductsNavigatorStack.Navigator>
  );
}

const ProfiletNavigatorStack = createStackNavigator();
function ProfileNavigatorStackFunc() {
  return (
    <ProfiletNavigatorStack.Navigator>
      <ProfiletNavigatorStack.Screen name="Profile" component={ProfileScreen} />
    </ProfiletNavigatorStack.Navigator>
  );
}

const WishlistNavigatorStack = createStackNavigator();
function WishlistNavigatorStackFunc() {
  return (
    <WishlistNavigatorStack.Navigator>
      <WishlistNavigatorStack.Screen
        name="Wishlist"
        component={WishlistScreen}
      />
    </WishlistNavigatorStack.Navigator>
  );
}

const OrdersNavigatorStack = createStackNavigator();
function OrdersNavigatorStackFunc() {
  return (
    <OrdersNavigatorStack.Navigator>
      <OrdersNavigatorStack.Screen name="Orders" component={OrdersScreen} />
    </OrdersNavigatorStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function ShopTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={ProductsNavigatorStackFunc}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersNavigatorStackFunc}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-folder" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={WishlistNavigatorStackFunc}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-heart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AuthNavigatorStack = createStackNavigator();
function AuthNavigatorStackFunc() {
  return (
    <AuthNavigatorStack.Navigator screenOptions={{gestureEnabled: false}}>
      <AuthNavigatorStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false, gesturesEnabled: false}}
      />
      <AuthNavigatorStack.Screen name="Otp" component={Otp} />
    </AuthNavigatorStack.Navigator>
  );
}
// Sidemenu Dashboard
const StackNavigator = createStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{gestureEnabled: false}}>
        <StackNavigator.Screen
          name="Auth"
          component={AuthNavigatorStackFunc}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <StackNavigator.Screen
          name="Shop"
          component={ShopTabs}
          options={{headerShown: false, gesturesEnabled: false}}
        />

        <StackNavigator.Screen
          name="Profile"
          component={ProfileNavigatorStackFunc}
          options={{headerShown: false, gesturesEnabled: false}}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
