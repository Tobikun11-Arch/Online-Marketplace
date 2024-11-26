import { create } from 'zustand';
import { AddToCartPayload } from '../Interface/CartItem';

interface CartProps {
    cart: AddToCartPayload[];
    setCart: (cartUpdater: (cart: AddToCartPayload[]) => AddToCartPayload[]) => void;
}

export const useProductCart = create<CartProps>((set) => ({
    cart: [],
    setCart: (cartUpdater) => set((state) => ({ cart: cartUpdater(state.cart) })),
}));
