import { useAppNavigation } from "../hooks/useAppNavigation";

export function NotFoundPage() {
    const { goToMainPage } = useAppNavigation();

    return (
        <div className="p-4 w-full h-full flex flex-col justify-center items-center">
            <h1>The page you were looking for does not exist.</h1>
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
                onClick={goToMainPage}
            >
                Go to main page
            </button>
        </div>
    );
}