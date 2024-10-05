import { create } from "zustand"
import { useSelectedProducts } from './ReusableHooks'

const { productSelected } = useSelectedProducts()

interface productSize {
    length: string;
    breadth: string;
    width: string;
}

interface ProductWeight {
    Weight: string;
    WeightIndicator: string;
}

// Define the ProductInfo interface
interface ProductInfo {
    productName: string;
    productDescription: string;
    productCategory: string;
    productQuality: string;
    productQuantity: string;
    Sku: string;
    productImages: File[];
    productWeight: ProductWeight;
    productSize: productSize;
    productPrice: string | number;
    productDiscount: string;

    // Methods to update the state
    setProductName: (productName: string) => void;
    setProductDescription: (productDescription: string) => void;
    setProductCategory: (productCategory: string) => void;
    setProductQuality: (productQuality: string) => void;
    setProductQuantity: (productQuantity: string) => void;
    setSku: (Sku: string) => void;
    setProductImages: (productImages: File[]) => void;
    setProductWeight: (key: keyof ProductWeight, value: string) => void;
    setProductSize: (key: keyof productSize, value: string) => void;
    setProductPrice: (productPrice: string | number) => void;
    setProductDiscount: (productDiscount: string) => void;
}

export const useProductDetails = create<ProductInfo>((set) => ({
    // Initial state
    productName: productSelected?.productName || '',
    productDescription: productSelected?.productDescription || '',
    productCategory: productSelected?.productCategory || '',
    productQuality: productSelected?.productQuality || '',
    productQuantity: productSelected?.productQuantity || '',
    Sku: productSelected?.Sku || '',
    productImages: productSelected?.images || [],
    productWeight: {
        Weight: productSelected?.productweight.Weight || '',
        WeightIndicator: productSelected?.productweight.WeightIndicator || 'kg'
    },
    productSize: {
        length: productSelected?.productSize.breadth || '',
        breadth: productSelected?.productSize.length || '',
        width: productSelected?.productSize.width || ''
    },
    productPrice: productSelected?.productPrice || '',
    productDiscount: productSelected?.productDiscount || '',

    // Methods to update state
    setProductName: (productName: string) => set(() => ({ productName })),
    setProductDescription: (productDescription: string) => set(() => ({ productDescription })),
    setProductCategory: (productCategory: string) => set(() => ({ productCategory })),
    setProductQuality: (productQuality: string) => set(() => ({ productQuality })),
    setProductQuantity: (productQuantity: string) => set(() => ({ productQuantity })),
    setSku: (Sku: string) => set(() => ({ Sku })),
    setProductImages: (productImages: File[]) => set(() => ({ productImages })),
    setProductWeight: (key: keyof ProductWeight, value: string) => set((state) => ({
        productWeight: {
            ...state.productWeight,
            [key]: value,
        },
    })),
    setProductSize: (key: keyof productSize, value: string) => set((state) => ({
        productSize: {
            ...state.productSize,
            [key]: value,
        },
    })),
    setProductPrice: (price: string | number) => set(() => ({ productPrice: price })),
    setProductDiscount: (discount: string) => set(() => ({ productDiscount: discount }))
}));
