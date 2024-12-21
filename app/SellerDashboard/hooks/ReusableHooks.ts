import {create} from 'zustand'
import { Product } from '../types/types'

interface loadingProps {
    isLoadingPublish: boolean;
    isLoadingDiscard: boolean;
    isLoadingSchedule: boolean;
    isLoading: boolean;
    isError: boolean;
    setLoadingPublish: (isLoadingPublish: boolean) => void;
    setLoadingDiscard: (isLoadingDiscard: boolean) => void;
    setLoadingSchedule: (isLoadingSchedule: boolean) => void;
    setLoading: (isLoadingSchedule: boolean) => void;
    setError: (isError: boolean) => void;
}

export const useLoading = create<loadingProps>((set) => ({
    isLoading: false,
    isLoadingPublish: false,
    isLoadingDiscard: false,
    isLoadingSchedule: false,
    isError: false,
    setLoadingPublish: (isLoadingPublish: boolean) => set(() => ({ isLoadingPublish })),
    setLoadingDiscard: (isLoadingDiscard: boolean) => set(() => ({ isLoadingDiscard })),
    setLoadingSchedule: (isLoadingSchedule: boolean) => set(() => ({ isLoadingSchedule })),
    setLoading: (isLoading: boolean) => set(() => ({ isLoading })),
    setError: (isError: boolean) => set(() => ({ isError }))
}))

interface scheduleProps {
    isSchedule: boolean;
    setSchedule: (isSchedule: boolean) => void;

    DateSchedule: string;
    setDate: (DateScedule: string) => void;

    TimeSchedule: string;
    setTime: (TimeSchedule: string) => void;
}

export const useSchedule = create<scheduleProps>((set) => ({
    isSchedule: false,
    DateSchedule: '',
    TimeSchedule: '',

    setSchedule: (isSchedule: boolean) => set(() => ({ isSchedule })),
    setDate: (DateSchedule: string) => set(() => ({ DateSchedule })),
    setTime: (TimeSchedule: string) => set(() => ({ TimeSchedule }))
}))

interface dataProps {
    dataPass: Product[] | undefined;
    setData: (data: Product[] | undefined) => void;
}

export const useData = create<dataProps>((set) => ({
    dataPass: [],
    setData: (dataPass: Product[] | undefined) => set(() => ({ dataPass }))
}))

interface Select {
    OverallStorage: string;
    InStock: string;
  }
interface searchProps {
    searchField: string;
    selected: Select;
    setSelected: (selected: Select) => void;
    setSearchField: (searchField: string) => void;
  }
  
  export const useSearch = create<searchProps>((set) => ({
    searchField: '',
    selected: {
      OverallStorage: '',
      InStock: '',
    },
    setSelected: (selected: Select) => set(() => ({ selected })),
    setSearchField: (searchField: string) => set(() => ({ searchField }))
  }));

  interface SelectedProps {
    productSelected: Product | null;
    isModalOpen: boolean;
    setSelect: (productSelected: Product | null)  => void;
    setModalOpen: (isModalOpen: boolean)  => void;
  }

  export const useSelectedProducts = create<SelectedProps>((set)=> ({
    productSelected: null,
    isModalOpen: false,
    setSelect: (productSelected: Product | null) => set(() => ({ productSelected })),
    setModalOpen: (isModalOpen: boolean) => set(() => ({ isModalOpen }))
  }))