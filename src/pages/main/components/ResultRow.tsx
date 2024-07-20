import rightArrowIcon from '../../../assets/right-arrow.svg';
import { useAppNavigation } from '../../../hooks/useAppNavigation';

type Props = {
    inscriptionId: string;
};

export const ResultRow = ({ inscriptionId }: Props) => {
    const { goToDetails } = useAppNavigation();
    
    return (
        <div 
            className="h-[49px] flex justify-between items-center mb-[11px] cursor-pointer"
            onClick={() => goToDetails(inscriptionId)}
        >
            <span className="font-[500]">
                Inscription {inscriptionId.slice(0, 8)}
            </span>
            <img src={rightArrowIcon} width={7} height={14} alt="" />
        </div>
    );
}