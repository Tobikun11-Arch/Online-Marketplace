import { create } from 'zustand'
import { ReviewOrder } from '../types/product'

interface ChartProps {
    Chart: ReviewOrder[]
    setChart: (Chart: ReviewOrder[]) => void
}

export const NotifBuyer = create<ChartProps>((set)=> ({
    Chart: [],
    setChart: (Chart: ReviewOrder[]) => set({ Chart })
}))