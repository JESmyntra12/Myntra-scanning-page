import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, FlatList, StatusBar } from 'react-native';

const products = [
  {
    id: '1',
    name: 'her by invictus',
    description: 'One Shoulder Ruffles Top',
    price: '₹674',
    image: require('./assets/product1.png'),
    rating: 4.1,
    reviews: 975,
    discount: 'Only Few Left!',
  },
  {
    id: '2',
    name: 'Tokyo Talkies',
    description: 'Floral One Shoulder Top',
    price: '₹236',
    image: require('./assets/product2.png'),
    rating: 4.1,
    reviews: 508,
    discount: 'Only Few Left!',
  },
  {
    id: '3',
    name: 'her by invictus',
    description: 'One Shoulder Ruffles Top',
    price: '₹674',
    image: require('./assets/product1.png'),
    rating: 4.1,
    reviews: 975,
    discount: 'Only Few Left!',
  },
  {
    id: '4',
    name: 'Tokyo Talkies',
    description: 'Floral One Shoulder Top',
    price: '₹236',
    image: require('./assets/product2.png'),
    rating: 4.1,
    reviews: 508,
    discount: 'Only Few Left!',
  },
];

const App = () => {
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startScanning();
  }, []);

  const startScanning = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const scanTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productRating}>{`Rating: ${item.rating} (${item.reviews} reviews)`}</Text>
      <Text style={styles.productDiscount}>{item.discount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.scanContainer}>
        <Text style={styles.scanText}>Scanning...</Text>
        <View style={styles.imagePlaceholder}>
          <Image source={require('./assets/dress_outline.png')} style={styles.dressOutline} />
          <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanTranslateY }] }]} />
        </View>
      </View>
      <Text style={styles.relatedSearchText}>Related Search</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scanContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scanText: {
    fontSize: 20,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  dressOutline: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 5,
    backgroundColor: '#8E24AA',
  },
  relatedSearchText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productsList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#E91E63',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productRating: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  productDiscount: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: 'bold',
  },
});

export default App;
