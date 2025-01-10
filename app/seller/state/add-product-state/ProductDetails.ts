import { create } from 'zustand';

interface DetailsProps {
    isProductName: string;
    isDescription: string;
    isSku: string;
    isPrice: number;
    isStock: number;
    isDiscount: number;
    isQuality: string;
    setisProductName: (isProductName: string) => void;
    setDescription: (isDescription: string) => void;
    setSku: (isSku: string) => void;
    setPrice: (isPrice: number) => void;
    setStock: (isStock: number) => void;
    setDiscount: (isDiscount: number) => void;
    setQuality: (isQuality: string) => void;
}

export const productDetails = create<DetailsProps>((set) => ({
    isProductName: '',
    isDescription: '',
    isSku: '',
    isPrice: 0,
    isStock: 0,
    isDiscount: 0,
    isQuality: 'New',
    setisProductName: (isProductName: string) => set({ isProductName }),
    setDescription: (isDescription: string) => set({ isDescription }),
    setSku: (isSku: string) => set({ isSku }),
    setPrice: (isPrice: number) => set({ isPrice }),
    setStock: (isStock: number) => set({ isStock }),
    setDiscount: (isDiscount: number) => set({ isDiscount }),
    setQuality: (isQuality: string) => set({ isQuality }),
}));

interface ImagesProps {
    isSubImage_01: string;
    isSubImage_02: string;
    isSubImage_03: string;
    setSubImage_01: (isSubImage_01: string) => void;
    setSubImage_02: (isSubImage_02: string) => void;
    setSubImage_03: (isSubImage_03: string) => void;
}

export const useImages = create<ImagesProps>((set) => ({
    isSubImage_01: '',
    isSubImage_02: '',
    isSubImage_03: '',
    setSubImage_01: (isSubImage_01: string) => set({ isSubImage_01 }),
    setSubImage_02: (isSubImage_02: string) => set({ isSubImage_02 }),
    setSubImage_03: (isSubImage_03: string) => set({ isSubImage_03 }),
}));