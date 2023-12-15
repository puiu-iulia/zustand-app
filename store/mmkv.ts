import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV({
    id: 'cart-storeage'
});

export const zustandStorage: StateStorage = {
    setItem: (name: string, value: string) => storage.set(name, value),
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem: (name: string) => storage.delete(name)
};