import React, { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow'
import debounce from 'lodash.debounce';
import { ResultRow } from './ResultRow';
import { useCoreService } from '../../../contexts/CoreServiceContext';
import { useUserStore } from '../../../stores/useUserStore';
import { cn } from '../../../utils/cn';

export const LookupForm: React.FC = () => {
    const [walletAddress, setWalletAddress, results, setResults] = useUserStore(
        useShallow(state => [
            state.walletAddress, state.setWalletAddress, state.results, state.setResults
        ])
    );
    const [inputValue, setInputValue] = useState(walletAddress || '');
    const firstTimeRender = React.useRef(true);
    const coreService = useCoreService();

    // @todo fetch latest results while still displaying the previous ones
    // I would usually do that using react-query/SWR/rtk-query
    useEffect(() => {
        // @todo handle this case more gracefully (not taproot)
        if (!walletAddress || !walletAddress.startsWith('bc1') || !firstTimeRender) return;

        coreService.getInscriptions({ walletAddress }).then(setResults);
        firstTimeRender.current = false;
    }, [coreService, walletAddress, setResults]);

    const debouncedSetWalletAddress = useCallback(
        debounce((value: string) => {
            setWalletAddress(value.trim());
        }, 500),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setWalletAddress('');
            setResults([]);
        }

        const { value } = e.target;

        setInputValue(value);
        debouncedSetWalletAddress(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        coreService.getInscriptions({ walletAddress: walletAddress! }).then(setResults);
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
                    className="h-[32px] w-full px-4 text-gray-300 bg-[#24252C] focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    disabled={!walletAddress}
                    className={cn(
                        'h-[46px] w-full mt-2.5 text-white rounded-[10px] focus:outline-none',
                        walletAddress
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-400 cursor-not-allowed'
                    )}            
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
