import React, { useState, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow'
import debounce from 'lodash.debounce';
import { ResultRow } from './ResultRow';
import { useCoreService } from '../../../contexts/CoreServiceContext';
import { useUserStore } from '../../../stores/useUserStore';

export const LookupForm: React.FC = () => {
    const [walletAddress, setWalletAddress] = useUserStore(
        useShallow(state => [state.walletAddress, state.setWalletAddress])
    );
    const [results, setResults] = useState([]);
    const coreService = useCoreService();

    const debouncedSetWalletAddress = useCallback(
        debounce((value: string) => {
            setWalletAddress(value);
        }, 500),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetWalletAddress(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        coreService.getInscriptions({ walletAddress }).then(setResults);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-4 rounded-lg">
                <label className="block text-sm font-bold mb-2" htmlFor="walletAddress">
                    Owner Bitcoin Address:
                </label>
                <input
                    id="walletAddress"
                    type="text"
                    onChange={handleInputChange}
                    className="h-[32px] w-full px-4 text-gray-300 bg-[#24252C] focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="h-[46px] w-full mt-2.5 text-white bg-blue-600 rounded-[10px] hover:bg-blue-700 focus:outline-none"
                >
                    Look up
                </button>
            </form>
            {results.length > 0 && (
                <div className="mt-4 w-full max-w-md">
                    {results.map((result) =>
                        <ResultRow key={result} inscriptionId={result} />
                    )}
                </div>
            )}
        </div>
    );
};
