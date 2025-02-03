import { create } from 'zustand'
import { tableData, InventoryData, ProductQuantity, Product_Orders, BuyerInformation } from '../../types/product'

interface ProductProps {
    tableData: tableData[]
    setTableData: (tableData: tableData[]) => void

    unitsold: ProductQuantity[]
    setUnitSold: (unitsold: ProductQuantity[]) => void

    inventoryTable: InventoryData[]
    setInventory: (inventoryTable: InventoryData[]) => void

    order_table: Product_Orders[]
    setorderTable: (order_table: Product_Orders[]) => void

    customer_table: BuyerInformation[]
    setCustomerTable: (customer_table: BuyerInformation[]) => void
}

export const useProductDetails = create<ProductProps>((set)=> ({
    tableData: [],
    inventoryTable: [],
    unitsold: [],
    order_table: [],
    customer_table: [],

    setTableData: (tableData: tableData[]) => set({tableData}),
    setInventory: (inventoryTable: InventoryData[]) => set({ inventoryTable }),
    setUnitSold: (unitsold: ProductQuantity[]) => set({unitsold}),
    setorderTable: (order_table: Product_Orders[]) => set({ order_table }),
    setCustomerTable: (customer_table: BuyerInformation[]) => set({ customer_table })
}))


interface filterProps {
    isStatus: string
    setStatus: (isStatus: string) => void
}

export const usefilter = create<filterProps>((set)=> ({
    isStatus: '',
    setStatus: (isStatus: string) => set({isStatus}),
}))