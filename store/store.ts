import { StateCreator, StoreMutatorIdentifier, create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from './mmkv'

export interface CartState {
    products: Array<Product & { quantity: number }>;
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
    clearCart: () => void;
    items: () => string;
    total: () => string;
}

type Logger = <
	T extends unknown,
	Mps extends [StoreMutatorIdentifier, unknown][] = [],
	Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
	f: StateCreator<T, Mps, Mcs>,
	name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends unknown>(
	f: StateCreator<T, [], []>,
	name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
	type T = ReturnType<typeof f>;
	const loggedSet: typeof set = (...a) => {
		set(...a);
		console.log(...(name ? [`${name}:`] : []), get());
	};
	store.setState = loggedSet;

	return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

const useCartStore = create<CartState>()(
    persist(
    logger((set, get) => ({
        products: [],
        addProduct: (product) => {
            const { products } = get();
            const productIndex = products.findIndex(({ id }) => id === product.id);

            if (productIndex !== -1) {
                const updatedProducts = [...products];
                updatedProducts[productIndex].quantity += 1;
                set({ products: updatedProducts });
            } else {
                set({ products: [...products, { ...product, quantity: 1 }] });
            }
        },
        removeProduct: (product) => {
            const { products } = get();
            const productIndex = products.findIndex(({ id }) => id === product.id);

            if (productIndex !== -1) {
                const updatedProducts = [...products];
                updatedProducts[productIndex].quantity -= 1;

                if (updatedProducts[productIndex].quantity === 0) {
                    updatedProducts.splice(productIndex, 1);
                }

                set({ products: updatedProducts });
            }
        },
        clearCart: () => set({ products: [] }),
        items: () => get().products.reduce((acc, {  quantity }) => acc + quantity, 0).toFixed(),
        total: () => get().products.reduce((acc, { price, quantity }) => acc + price * quantity, 0).toFixed(2),
    })), {
        name: 'cart',
        storage: createJSONStorage(() => zustandStorage),
    }
)
);

export default useCartStore;
