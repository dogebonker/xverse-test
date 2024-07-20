import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Details Page</h1>
            <p>Here are the details...</p>
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
                onClick={goToMainPage}
            >
                Go to main page
            </button>
        </div>
    );
}