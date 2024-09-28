import {create} from 'zustand'
import { Product } from '../types/types'

interface loadingProps {
    isLoadingPublish: boolean;
    isLoadingDiscard: boolean;
    isLoadingSchedule: boolean;
    isError: boolean;
    setLoadingPublish: (isLoadingPublish: boolean) => void;
    setLoadingDiscard: (isLoadingDiscard: boolean) => void;
    setLoadingSchedule: (isLoadingSchedule: boolean) => void;
    setError: (isError: boolean) => void;
}

export const useLoading = create<loadingProps>((set) => ({
    isLoadingPublish: false,
    isLoadingDiscard: false,
    isLoadingSchedule: false,
    isError: false,
    setLoadingPublish: (isLoadingPublish: boolean) => set(() => ({ isLoadingPublish })),
    setLoadingDiscard: (isLoadingDiscard: boolean) => set(() => ({ isLoadingDiscard })),
    setLoadingSchedule: (isLoadingSchedule: boolean) => set(() => ({ isLoadingSchedule })),
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


