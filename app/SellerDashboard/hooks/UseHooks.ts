import {create} from 'zustand';

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
    previewImages: string[];
    productImages: File[];
    productWeight: ProductWeight;
    productSize: productSize;
    productPrice: string;
    productDiscount: string;

    // Methods to update the state
    setProductName: (productName: string) => void;
    setProductDescription: (productDescription: string) => void;
    setProductCategory: (productCategory: string) => void;
    setProductQuality: (productQuality: string) => void;
    setProductQuantity: (productQuantity: string) => void;
    setSku: (Sku: string) => void;
    setPreviewImages: (previewImages: string[]) => void;
    setProductImages: (productImages: File[]) => void;
    setProductWeight: (key: keyof ProductWeight, value: string) => void;
    setProductSize: (key: keyof productSize, value: string) => void;
    setProductPrice: (productPrice: string) => void;
    setProductDiscount: (productDiscount: string) => void;
}

// Properly typed Zustand store
export const UseProductStore = create<ProductInfo>((set) => ({
    // Initial state
    productName: '',
    productDescription: '',
    productCategory: '',
    productQuality: '',
    productQuantity: '',
    Sku: '',
    previewImages: [],
    productImages: [],
    productWeight: {
        Weight: '',
        WeightIndicator: 'kg'
    },
    productSize: {
        length: '',
        breadth: '',
        width: ''
    },
    productPrice: '',
    productDiscount: '',

    // Methods to update state
    setProductName: (productName: string) => set(() => ({ productName })),
    setProductDescription: (productDescription: string) => set(() => ({ productDescription })),
    setProductCategory: (productCategory: string) => set(() => ({ productCategory })),
    setProductQuality: (productQuality: string) => set(() => ({ productQuality })),
    setProductQuantity: (productQuantity: string) => set(() => ({ productQuantity })),
    setSku: (Sku: string) => set(() => ({ Sku })),
    setPreviewImages: (previewImages: string[]) => set(() => ({ previewImages })),
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
    setProductPrice: (price: string) => set(() => ({ productPrice: price })),
    setProductDiscount: (discount: string) => set(() => ({ productDiscount: discount }))
}));
