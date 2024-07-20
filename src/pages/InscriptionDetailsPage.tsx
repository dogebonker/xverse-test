import { useEffect, useState } from 'react';
import rightArrowIcon from '../assets/right-arrow.svg';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { useCoreService } from '../contexts/CoreServiceContext';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { transformSnakeCaseToTitleCase } from '../utils/transformSnakeCaseToTitleCase';

export function InscriptionDetailsPage() {
    const [details, setDetails] = useState<any>();
    const [content, setContent] = useState<any>();
    const { goToMainPage } = useAppNavigation();
    const coreService = useCoreService();
    const inscriptionId = useParams().inscriptionId;
    const walletAddress = useUserStore(state => state.walletAddress);

    useEffect(() => {
        // @todo can handle this case more gracefully
        if (!inscriptionId || !walletAddress) {
            goToMainPage();
            return;
        }

        if (!coreService) return;

        coreService.getInscriptionDetails({ walletAddress, inscriptionId }).then(({ data }) => {
            console.log(data);
            setDetails(data);
        });
    }, [coreService, inscriptionId, walletAddress]);

    useEffect(() => {
        if (!details || !inscriptionId) return;

        if (!details?.content_type?.includes('text')) return;
        
        coreService.getInscriptionContent({ inscriptionId }).then(({ data }) => {
            setContent(JSON.stringify(data));
        });
    }, [coreService, details, inscriptionId]);


    function getBaseInfo() {
        const baseInfo = {
            'Inscription ID': details?.id,
            'Owner address': details?.address
        } as const;

        return Object.entries(baseInfo).map(([key, value]) => (
            <div key={key} className='mt-[24px]'>
                <p className='text-[#FFFFFFB2] mb-[8px] text-[12px]'>{key}</p>
                <p className='text-[14px] break-words'>{value}</p>
            </div>
        ));
    }

    function getContentBasedOnType() {
        switch (true) {
            case (details?.content_type?.includes('text')):
                return <code className='text-[14px] mt-[24px] break-words w-full'>{content}</code>;
            case (details?.content_type?.includes('image')):
                return <img className='mt-[24px] w-full' src={`https://ord.xverse.app/content/${details?.id}`} alt="" />;
            default:
                return null;
        }
    }

    function getAttributes() {
        const KEYS_TO_EXCLUDE = ['address', 'id', 'number'];

        return Object.entries(details)
            .filter(([key]) => !KEYS_TO_EXCLUDE.includes(key))
            .map(([key, value]) => (
                <div key={key} className='mt-[24px]'>
                    <p className='text-[#FFFFFFB2] mb-[8px] text-[12px]'>{transformSnakeCaseToTitleCase(key)}</p>
                    <p className='rounded-lg pl-[12px] pt-[11px] pr-[16px] pb-[12px] bg-[#24252C] text-[14px] break-words'>{value}</p>
                </div>
            ));
    }

    return (
        <>
            <header className="relative h-[88px] flex justify-center items-center">
                <img onClick={goToMainPage} src={rightArrowIcon} alt="" className="absolute left-[20px] bottom-[17px] rotate-180 cursor-pointer" />
                <h1 className="font-[600] text-[14px] pb-[17px] pt-[54px]">Details</h1>
            </header>
            <div className='min-h-[100px]'>
                {getContentBasedOnType()}
            </div>
            {details ? (
                <section className='pl-[17px] pr-[15px]'>
                    <div>
                        <h1 className='font-[500] mb-[17px] mt-[24px] text-[16px] leading-[22px] tracking-[2%]'>Inscription {details?.number}</h1>
                        <hr className='border-t-2 border-[#24252C] w-full' />
                    </div>
                    {getBaseInfo()}
                    <p className='mt-[48px] mb-[33px] font-[600] text-[16px] leading-[22px] tracking-[2%]'>Attributes</p>
                    {getAttributes()}
                </section>
            ) : null}
        </>
    );
}