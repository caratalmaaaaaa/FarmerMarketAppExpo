import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function AddProduct() {
  const router = useRouter();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [popularity, setPopularity] = useState(''); // New field
  const [image, setImage] = useState(null);
  const [isImageSaved, setIsImageSaved] = useState(false);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allows selecting images
      allowsEditing: true, // Enables cropping and flipping
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image URI
      setIsImageSaved(false); // Reset saved state
    }
  };

  const handleImageSave = () => {
    if (image) {
      setIsImageSaved(true); // Mark image as confirmed
      Alert.alert('Image Saved', 'Image has been saved successfully!');
    } else {
      Alert.alert('No Image', 'Please select an image first.');
    }
  };

  const handleAddProduct = async () => {
    if (
      !productName ||
      !price ||
      !description ||
      !quantity ||
      !category ||
      !popularity ||
      !isImageSaved
    ) {
      Alert.alert('Error', 'Please fill in all fields and save the image.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'You are not logged in.');
        return;
      }

      const formData = new FormData();
      formData.append('name', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('quantity_available', quantity);
      formData.append('category', category);
      formData.append('popularity', popularity); // Include popularity in the payload

      const imageName = image.split('/').pop();
      const imageType = `image/${imageName.split('.').pop()}`;

      formData.append('image', {
        uri: image,
        name: imageName,
        type: imageType,
      });

      const response = await axios.post(
        'https://farmer-market-33zm.onrender.com/farmer/products/create/',
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Product added successfully!');
        router.back();
      } else {
        Alert.alert('Error', 'Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Add Product Error:', error.response?.data || error.message);
      Alert.alert('Error', 'An error occurred while adding the product.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity Available"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Fruits, Vegetables)"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Popularity (e.g., 1-100)"
        keyboardType="numeric"
        value={popularity}
        onChangeText={setPopularity} // New field
      />

      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        <Text style={styles.imagePickerText}>
          {image ? 'Change Image' : 'Pick an Image'}
        </Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: image }} style={styles.image} />
          {!isImageSaved && (
            <Button title="Save Image" onPress={handleImageSave} />
          )}
        </View>
      )}

      <Button title="Add Product" onPress={handleAddProduct} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  imagePicker: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#333',
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});
