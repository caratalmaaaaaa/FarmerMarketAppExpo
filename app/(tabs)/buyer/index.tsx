import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Button } from 'react-native';

export default function BuyerDashboard() {
  const sampleProducts = [
    { id: '1', name: 'Tomatoes', price: '$2/kg', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Potatoes', price: '$1.5/kg', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Carrots', price: '$2.5/kg', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Cucumbers', price: '$3/kg', image: 'https://via.placeholder.com/100' },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>Price: {item.price}</Text>
      <Button title="Add to Cart" onPress={() => console.log(`Added ${item.name} to cart`)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buyer Dashboard</Text>
      <Text style={styles.subHeader}>Browse Products</Text>
      <FlatList
        data={sampleProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});
