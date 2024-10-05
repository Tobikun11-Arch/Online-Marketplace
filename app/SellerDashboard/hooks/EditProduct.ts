import { create } from "zustand";

interface ProductSize {
  length: string;
  breadth: string;
  width: string;
}

interface ProductWeight {
  Weight: string;
  WeightIndicator: string;
}

interface ProductInfo {
  productName: string;
  productDescription: string;
  productCategory: string;
  productQuality: string;
  productQuantity: string;
  Sku: string;
  productImages: File[];
  previewImages: string[];
  productWeight: ProductWeight;
  productSize: ProductSize;
  productPrice: string;
  productDiscount: string;

  setProductName: (productName: string) => void;
  setProductDescription: (productDescription: string) => void;
  setProductCategory: (productCategory: string) => void;
  setProductQuality: (productQuality: string) => void;
  setProductQuantity: (productQuantity: string) => void;
  setSku: (Sku: string) => void;
  setProductImages: (productImages: File[]) => void;
  setPreviewImages: (previewImages: string[]) => void;
  setProductWeight: (key: keyof ProductWeight, value: string) => void;
  setProductSize: (key: keyof ProductSize, value: string) => void;
  setProductPrice: (productPrice: string) => void;
  setProductDiscount: (productDiscount: string) => void;
}

export const useProductDetails = create<ProductInfo>((set) => ({
  // Initialize with empty/default values
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
    WeightIndicator: 'kg',
  },
  productSize: {
    length: '',
    breadth: '',
    width: '',
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
  setProductSize: (key: keyof ProductSize, value: string) => set((state) => ({
    productSize: {
      ...state.productSize,
      [key]: value,
    },
  })),
  setProductPrice: (productPrice: string) => set(() => ({ productPrice })),
  setProductDiscount: (productDiscount: string) => set(() => ({ productDiscount })),
}));
