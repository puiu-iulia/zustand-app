import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import useCartStore from '../../store/store';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { items } = useCartStore();

  const CartButton = () => {
    return (
      <Link href="/modal" asChild>
        <Pressable style={{ marginRight: 15 }}>
          <FontAwesome
            name="shopping-cart"
            size={20}
            color={Colors[colorScheme ?? 'light'].text}
          />
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{items()}</Text>
          </View>
        </Pressable>
      </Link>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
          headerRight: () => <CartButton />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Shopping Cart',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  countContainer: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
  countText: {
    color: 'red'
  }
});