import { create } from 'zustand'
import { tableData } from '../../types/product'

interface ProductProps {
    tableData: tableData[]
    setTableData: (tableData: tableData[]) => void
}

export const useProductDetails = create<ProductProps>((set)=> ({
    tableData: [],
    setTableData: (tableData: tableData[]) => set({tableData})
}))


interface filterProps {
    isStatus: string
    setStatus: (isStatus: string) => void
}

export const usefilter = create<filterProps>((set)=> ({
    isStatus: '',
    setStatus: (isStatus: string) => set({isStatus}),
}))