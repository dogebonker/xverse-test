import { useEffect } from 'react';
import rightArrowIcon from '../../assets/right-arrow.svg';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { useCoreService } from '../../contexts/CoreServiceContext';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';

export function InscriptionDetailsPage() {
    const { goToMainPage } = useAppNavigation();
    const coreService = useCoreService();
    const inscriptionId = useParams().inscriptionId;
    const walletAddress = useUserStore(state => state.walletAddress);

    useEffect(() => {
        // @todo can handle this case more gracefully
        if (!inscriptionId) {
            goToMainPage();
            return;
        }
        coreService.getInscriptionDetails({ walletAddress, inscriptionId }).then((content) => {
            console.log(content);
        });
    }, [coreService, inscriptionId, goToMainPage, walletAddress]);

    return (
        <>
            <header className="relative h-[88px] flex justify-center items-center">
                <img onClick={goToMainPage} src={rightArrowIcon} alt="" className="absolute left-[20px] bottom-[17px] rotate-180 cursor-pointer" />
                <h1 className="font-[500] text-[14px] pb-[17px] pt-[54px]">Details</h1>
            </header>
            <section>
                <img className='w-full' src={`https://ord.xverse.app/content/${inscriptionId}`} alt="" />
            </section>
        </>
    );
}