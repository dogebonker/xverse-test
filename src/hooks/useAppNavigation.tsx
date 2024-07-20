import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/');
    }

    const goToDetails = (inscriptionId: string) => {
        navigate(`/details/${inscriptionId}`);
    }

    return {
        goToMainPage,
        goToDetails
    };
}