import { create } from 'zustand'
import { tableData, InventoryData } from '../../types/product'

interface ProductProps {
    tableData: tableData[]
    setTableData: (tableData: tableData[]) => void

    inventoryTable: InventoryData[]
    setInventory: (inventoryTable: InventoryData[]) => void
}

export const useProductDetails = create<ProductProps>((set)=> ({
    tableData: [],
    inventoryTable: [],

    setTableData: (tableData: tableData[]) => set({tableData}),
    setInventory: (inventoryTable: InventoryData[]) => set({ inventoryTable })
}))


interface filterProps {
    isStatus: string
    setStatus: (isStatus: string) => void
}

export const usefilter = create<filterProps>((set)=> ({
    isStatus: '',
    setStatus: (isStatus: string) => set({isStatus}),
}))