import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState(null); // To store product details
  const [error, setError] = useState(null); // To store any error messages
  const [loading, setLoading] = useState(true); // To handle loading state
  let idofp = 1;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios({method: 'get',
          url: "https://farmer-market-33zm.onrender.com/products/products/".concat(idofp.toString())
        }
        );
        setProduct(response.data); // Set product details
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Handle errors
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#00f" style={styles.centered} />;
  if (error!=null)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error type shi: {error}</Text>
      </View>
    );

  // Destructure data for readability
  const {
    id,
    farmer: { idfarmer:int, farmerName, location, contact_info },
    category,
    name,
    description,
    price,
    popularity,
    quantity_available,
    date_added,
    image,
    pip,
    lst,
    url
    
  } = product;

//<Image source={{ uri: image }} style={styles.image} />w
  //
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>{name}</Text>
  
      {/* Product Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Category: </Text>{category}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Description: </Text>{description}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Price: </Text>${price}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Popularity: </Text>{popularity}%
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Quantity Available: </Text>{quantity_available}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Date Added: </Text>{new Date(date_added).toLocaleString()}
        </Text>
      </View>
  
      {/* Farmer Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farmer Details</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Name: </Text>{farmerName}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Location: </Text>{location}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Contact Info: </Text>{contact_info}
        </Text>
      </View>
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginVertical: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
});
;

export default ProductDetails;