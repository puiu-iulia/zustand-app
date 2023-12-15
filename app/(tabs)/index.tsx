import { useEffect } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import data from '../../assets/data.json';
import { Ionicons } from '@expo/vector-icons';
import useCartStore  from '../../store/store';

export default function TabOneScreen() {

  const { products, addProduct, removeProduct } = useCartStore();
  
  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <View style={styles.cardItemContainer}>
        <Image 
          style={styles.image}
          source={{uri: item.image}} 
        />
        <View style={styles.itemContainer}>
          <Text style={styles.cartItemName}>{item.title}</Text>
          <Text>${item.price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => removeProduct(item)}>
            <Ionicons name="remove" size={20} color={'#000'}/>
          </TouchableOpacity>
          <Text>1</Text>
          <TouchableOpacity onPress={() => addProduct(item)}>
            <Ionicons name="add" size={20} color={'#000'}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
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
