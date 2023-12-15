import { useEffect } from 'react';
import { ListRenderItem, StyleSheet, SafeAreaView } from 'react-native';
import { View, FlatList, Text, Image, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useCartStore from '../store/store';

export default function ModalScreen() {

  const { products, addProduct, removeProduct, clearCart, total} = useCartStore();

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return (
      <View style={styles.cardItemContainer}>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
        />
        <View style={styles.itemContainer}>
          <Text style={styles.cartItemName}>{item.title}</Text>
          <Text>${item.price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => removeProduct(item)}>
            <Ionicons name="remove" size={20} color={'#000'} />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => addProduct(item)}>
            <Ionicons name="add" size={20} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={<Text>Total: {total()}</Text>}
        />
        <Button title="Clear Cart" onPress={() => clearCart()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItemContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    objectFit: 'contain'
  },
  itemContainer: {
    flex: 1
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
});
