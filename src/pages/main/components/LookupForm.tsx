import React, { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ResultRow } from './ResultRow';
import { useCoreService } from '../../../contexts/CoreServiceContext';
import { useUserStore } from '../../../stores/useUserStore';
import { cn } from '../../../utils/cn';
import { isTaprootAddress } from '../../../utils/isTaprootAddress';

export const LookupForm: React.FC = () => {
    const [walletAddress, setWalletAddress, results, setResults] = useUserStore(
        useShallow(state => [
            state.walletAddress, state.setWalletAddress, state.results, state.setResults
        ])
    );
    const [inputValue, setInputValue] = useState(walletAddress || '');
    const coreService = useCoreService();

    useEffect(() => {
        if (walletAddress) {
            fetchInscriptions(walletAddress);
        }
    }, [coreService, walletAddress]);

    const fetchInscriptions = useCallback(async (address: string) => {
        try {
            const response = await coreService.getInscriptions({ walletAddress: address });
            setResults(response);
        } catch (error) {
            console.error('Error fetching inscriptions:', error);
        }
    }, [coreService, setResults]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value);
        setResults([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedAddress = inputValue.trim();

        if (!isTaprootAddress(trimmedAddress)) {
            alert('Invalid address format. Only taproot addresses are allowed.');
            return;
        }

        setWalletAddress(trimmedAddress);
        fetchInscriptions(trimmedAddress);
    };

    return (
        <div className="flex flex-col items-center justify-center pl-[16px] pr-[17px]">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg">
                <label className="block text-sm font-bold mb-2" htmlFor="walletAddress">
                    Owner Bitcoin Address:
                </label>
                <input
                    id="walletAddress"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="h-[32px] w-full px-4 text-gray-300 bg-[#24252C] focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={!inputValue.length}
                    className={cn(
                        'h-[46px] w-full mt-2.5 text-white rounded-[10px] focus:outline-none',
                        inputValue.length
                            ? 'bg-[#465AE9] hover:bg-blue-700'
                            : 'bg-gray-400 cursor-not-allowed'
                    )}
                >
                    Look up
                </button>
            </form>
            {results.length > 0 && (
                <div className="mt-4 w-full max-w-md">
                    {results.map((result) => (
                        <ResultRow key={result} inscriptionId={result} />
                    ))}
                </div>
            )}
        </div>
    );
};
