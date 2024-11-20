import React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

export default function FarmerDashboard() {
  const router = useRouter(); // Initialize router

  const sampleProducts = [
    { id: '1', name: 'Tomatoes', stock: '25 kg' },
    { id: '2', name: 'Potatoes', stock: '50 kg' },
    { id: '3', name: 'Carrots', stock: '30 kg' },
  ];

  const sampleOrders = [
    { id: '1', buyer: 'John Doe', quantity: '10 kg', status: 'Pending' },
    { id: '2', buyer: 'Jane Smith', quantity: '5 kg', status: 'Delivered' },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>Stock: {item.stock}</Text>
    </TouchableOpacity>
  );

  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>Order ID: {item.id}</Text>
      <Text style={styles.cardText}>Buyer: {item.buyer}</Text>
      <Text style={styles.cardText}>Quantity: {item.quantity}</Text>
      <Text style={styles.cardText}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Farmer Dashboard</Text>

      {/* Add Product Section */}
      <Button
        title="Add New Product"
        onPress={() => router.push('/farmer/AddProduct')} // Use router to navigate
      />

      {/* Product List */}
      <Text style={styles.sectionHeader}>Your Products</Text>
      <FlatList
        data={sampleProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        horizontal
        style={styles.list}
      />

      {/* Orders Section */}
      <Text style={styles.sectionHeader}>Recent Orders</Text>
      <FlatList
        data={sampleOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        style={styles.list}
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  list: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
});
