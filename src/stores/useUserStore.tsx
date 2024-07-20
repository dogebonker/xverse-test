import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface IUserState {
    walletAddress: string | null
    results: string[]
}

interface UserStoreState extends IUserState {
    setWalletAddress: (walletAddress: string) => void
    setResults: (results: string[]) => void
}

export const useUserStore = create<UserStoreState>()(
    devtools(
        persist(
            (set) => ({
                walletAddress: null,
                setWalletAddress: (walletAddress: string) => set({ walletAddress }),

                results: [],
                setResults: (results: string[]) => set({ results }),
            }),
            { name: 'user-storage' },
        ),
    ),
)
